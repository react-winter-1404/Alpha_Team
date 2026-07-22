import { useState, useEffect, useRef } from "react";
import { Button, Skeleton } from "@heroui/react";
import { getUserProfile } from "../../core/services/userPanel/get";
import toast from "react-hot-toast";
import { putPersonalProfile } from "../../core/services/userPanel/put";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search, MapPin, Navigation } from "@hugeicons/core-free-icons";

const MapPicker = ({ latitude, longitude, onLocationChange, readonly = false }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const [currentLat, setCurrentLat] = useState(latitude || 35.6892);
  const [currentLng, setCurrentLng] = useState(longitude || 51.3890);
  const [mapReady, setMapReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const searchTimeout = useRef(null);

  useEffect(() => {
    const checkLeaflet = setInterval(() => {
      if (window.L) {
        clearInterval(checkLeaflet);
        setMapReady(true);
      }
    }, 100);
    return () => clearInterval(checkLeaflet);
  }, []);

  const fetchReverseAddress = async (lat, lng) => {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
        params: {
          lat,
          lon: lng,
          format: "json",
          "accept-language": "fa",
        },
      });
      if (response.data && response.data.display_name) {
        setSearchTerm(response.data.display_name);
        onLocationChange && onLocationChange(lat.toFixed(6), lng.toFixed(6), response.data.display_name);
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      onLocationChange && onLocationChange(lat.toFixed(6), lng.toFixed(6));
    }
  };

  useEffect(() => {
    if (!mapReady || !mapRef.current || mapInstance.current) return;

    const L = window.L;

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });

    mapInstance.current = L.map(mapRef.current, {
      center: [currentLat, currentLng],
      zoom: 15,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance.current);

    markerRef.current = L.marker([currentLat, currentLng], {
      draggable: !readonly,
    }).addTo(mapInstance.current);

    setTimeout(() => mapInstance.current?.invalidateSize(), 500);

    if (!readonly) {
      mapInstance.current.on("click", (e) => {
        const { lat, lng } = e.latlng;
        markerRef.current.setLatLng([lat, lng]);
        setCurrentLat(lat.toFixed(6));
        setCurrentLng(lng.toFixed(6));
        fetchReverseAddress(lat, lng);
      });

      markerRef.current.on("dragend", () => {
        const pos = markerRef.current.getLatLng();
        setCurrentLat(pos.lat.toFixed(6));
        setCurrentLng(pos.lng.toFixed(6));
        fetchReverseAddress(pos.lat, pos.lng);
      });
    } else {
      mapInstance.current.dragging.disable();
      mapInstance.current.touchZoom.disable();
      mapInstance.current.doubleClickZoom.disable();
      mapInstance.current.scrollWheelZoom.disable();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [mapReady]);

  useEffect(() => {
    if (latitude && longitude && mapInstance.current && markerRef.current) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        mapInstance.current.setView([lat, lng], 15);
        markerRef.current.setLatLng([lat, lng]);
        setCurrentLat(lat);
        setCurrentLng(lng);
      }
    }
  }, [latitude, longitude]);

  const handleLatChange = (value) => {
    setCurrentLat(value);
    const lat = parseFloat(value);
    const lng = parseFloat(currentLng);
    if (!isNaN(lat) && !isNaN(lng) && mapInstance.current && markerRef.current) {
      mapInstance.current.setView([lat, lng], mapInstance.current.getZoom());
      markerRef.current.setLatLng([lat, lng]);
      onLocationChange && onLocationChange(value, currentLng);
    }
  };

  const handleLngChange = (value) => {
    setCurrentLng(value);
    const lat = parseFloat(currentLat);
    const lng = parseFloat(value);
    if (!isNaN(lat) && !isNaN(lng) && mapInstance.current && markerRef.current) {
      mapInstance.current.setView([lat, lng], mapInstance.current.getZoom());
      markerRef.current.setLatLng([lat, lng]);
      onLocationChange && onLocationChange(currentLat, value);
    }
  };

  const handleSearch = async (term) => {
    if (!term || term.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: term,
            format: "json",
            limit: 5,
            countrycodes: "ir",
            "accept-language": "fa",
          },
        });
        setSearchResults(response.data || []);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
      }
      setIsSearching(false);
    }, 500);
  };

  const handleSelectLocation = (item) => {
    const newLat = parseFloat(item.lat);
    const newLng = parseFloat(item.lon);
    setCurrentLat(newLat.toFixed(6));
    setCurrentLng(newLng.toFixed(6));
    setSearchTerm(item.display_name);
    setShowResults(false);

    if (mapInstance.current && markerRef.current) {
      mapInstance.current.setView([newLat, newLng], 17);
      markerRef.current.setLatLng([newLat, newLng]);
    }

    onLocationChange && onLocationChange(newLat.toFixed(6), newLng.toFixed(6), item.display_name);
  };

  const handleGetMyCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("مرورگر شما از قابلیت موقعیت‌یابی پشتیبانی نمی‌کند");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const formattedLat = Number(lat).toFixed(6);
        const formattedLng = Number(lng).toFixed(6);

        setCurrentLat(formattedLat);
        setCurrentLng(formattedLng);

        if (mapInstance.current && markerRef.current) {
          mapInstance.current.setView([lat, lng], 17);
          markerRef.current.setLatLng([lat, lng]);
        }

        onLocationChange && onLocationChange(formattedLat, formattedLng);
        fetchReverseAddress(lat, lng);
        setIsLocating(false);
        toast.success("موقعیت فعلی شما یافت شد");
      },
      (error) => {
        console.error(error);
        setIsLocating(false);
        toast.error("دریافت موقعیت مکانی ناموفق بود یا دسترسی داده نشد");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  if (readonly) {
    return (
      <div className="w-full">
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "380px",
            borderRadius: "12px",
            border: "1px solid #e5e5ea",
            background: "#f8f9fa",
          }}
        />
        <div className="flex justify-between items-center mt-1">
          <small className="text-muted">موقعیت مکانی</small>
          <small className="text-muted" dir="ltr">{currentLat}, {currentLng}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-3">
      <div className="relative w-full z-10">
        <div className="flex items-center w-full bg-default border border-border rounded-xl overflow-hidden h-11 px-3 gap-2">
          <HugeiconsIcon icon={Search} size={18} className="text-muted flex-shrink-0" />
          <input
            type="text"
            placeholder="جستجوی آدرس، خیابان یا مکان..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            onFocus={() => searchResults.length > 0 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="w-full bg-transparent outline-none text-xs text-foreground placeholder:text-muted"
          />
          {isSearching && <span className="text-muted text-[10px] whitespace-nowrap">در حال جستجو...</span>}
          <button
            type="button"
            onClick={handleGetMyCurrentLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 bg-accent/10 hover:bg-accent/20 text-accent px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer whitespace-nowrap"
            title="موقعیت فعلی من"
          >
            <HugeiconsIcon icon={Navigation} size={15} className="flex-shrink-0" />
            <span>{isLocating ? "..." : "موقعیت من"}</span>
          </button>
        </div>

        {showResults && searchResults.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 bg-overlay border border-border rounded-xl mt-1 shadow-lg p-1 z-10 max-h-[250px] overflow-auto"
          >
            {searchResults.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-default transition-colors"
                onClick={() => handleSelectLocation(item)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <HugeiconsIcon icon={MapPin} size={16} className="text-primary flex-shrink-0" />
                <div>
                  <div className="font-bold text-foreground text-[13px]">{item.name || item.display_name?.substring(0, 60)}</div>
                  <small className="text-muted">{item.display_name?.substring(0, 100)}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        ref={mapRef}
        className="w-full h-[380px] rounded-2xl overflow-hidden border border-border shadow-md bg-default z-0"
      />

      <div className="grid grid-cols-2 gap-2 w-full">
        <input
          type="text"
          placeholder="عرض جغرافیایی"
          value={currentLat}
          onChange={(e) => handleLatChange(e.target.value)}
          dir="ltr"
          className="w-full h-11 px-3 bg-default border border-border rounded-xl text-xs text-foreground outline-none"
        />
        <input
          type="text"
          placeholder="طول جغرافیایی"
          value={currentLng}
          onChange={(e) => handleLngChange(e.target.value)}
          dir="ltr"
          className="w-full h-11 px-3 bg-default border border-border rounded-xl text-xs text-foreground outline-none"
        />
      </div>
    </div>
  );
};

const AddressProfile = () => {
  const { t } = useTranslation("panel");
  const [position, setPosition] = useState([35.6997, 51.3376]);
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUserProfile(response.data || {});
      if (response.data?.latitude && response.data?.longitude) {
        setPosition([Number(response.data.latitude), Number(response.data.longitude)]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("Latitude", Number(position[0]).toFixed(6));
    formData.append("Longitude", Number(position[1]).toFixed(6));
    if (userProfile.birthDay) {
      formData.append("BirthDay", new Date(userProfile.birthDay).toISOString());
    }

    try {
      const response = await putPersonalProfile(formData);
      if (response.data.success) {
        toast.success(response.data.message || "اطلاعات با موفقیت ثبت شد");
      } else {
        toast.error(response.data.message || "خطا در ثبت اطلاعات");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ارتباط با سرور");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-10 px-5 flex flex-col justify-start items-start gap-6">
      {isLoading ? (
        <div className="w-full flex flex-col gap-6">
          <Skeleton className="w-64 h-5 rounded-lg" />
          <Skeleton className="w-full h-[48px] rounded-xl" />
          <Skeleton className="w-full h-[380px] rounded-2xl" />
          <div className="grid grid-cols-2 gap-2 w-full">
            <Skeleton className="w-full h-11 rounded-xl" />
            <Skeleton className="w-full h-11 rounded-xl" />
          </div>
          <Skeleton className="w-[169px] h-[56px] rounded-[64px]" />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-sm sm:text-[16px] text-accent font-medium">
            {t("profile.mapGuide")}
          </h2>
          <MapPicker
            latitude={position[0]}
            longitude={position[1]}
            onLocationChange={(lat, lng) => setPosition([lat, lng])}
          />
          <Button
            isLoading={isSubmitting}
            onClick={onSubmit}
            className="w-[169px] h-[56px] rounded-[64px] bg-accent text-accent-foreground text-[16px] font-bold cursor-pointer hover:bg-accent/80 transition-colors"
          >
            {t("profile.saveLocation")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressProfile;