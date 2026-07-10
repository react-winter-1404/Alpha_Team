import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button, Skeleton } from "@heroui/react";
import { getUserProfile } from "../../core/services/userPanel/get";
import toast from "react-hot-toast";
import { putPersonalProfile } from "../../core/services/userPanel/put";
import { useTranslation } from "react-i18next";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
};

const MapComponent = ({ position, setPosition }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      ref={setMap}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} setPosition={setPosition} />
    </MapContainer>
  );
};

const AddressProfile = () => {
  const { t } = useTranslation("panel");
  const [position, setPosition] = useState([35.6997, 51.3376]);
  const [userProfile, setUserProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUserProfile(response.data);
      if (response.data.latitude && response.data.longitude) {
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
    const formData = new FormData();
    formData.append("Latitude", Number(position[0]).toFixed(6) || "");
    formData.append("Longitude", Number(position[1]).toFixed(6) || "");
    formData.append("BirthDay", new Date(userProfile.birthDay).toISOString());
    try {
      const response = await putPersonalProfile(formData);
      if (response.data.success) toast.success(response.data.message);
      else toast.error(response.data.message || "خطا در ثبت اطلاعات");
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ارتباط با سرور");
    }
  };

  return (
    <div className="w-full h-[520px] p-5 flex flex-col justify-start items-start gap-6">
      {isLoading ? (
        <>
          <Skeleton className="w-96 h-6 rounded-lg" />
          <Skeleton className="w-full h-[380px] rounded-[16px]" />
          <Skeleton className="w-40 h-11 rounded-[64px]" />
        </>
      ) : (
        <>
          <h2 className="text-[16px] text-accent indent-8 font-medium">
            {t("profile.mapGuide")}
          </h2>
          <div className="w-full h-[380px] rounded-[16px] overflow-hidden border border-border shadow-md">
            <MapComponent position={position} setPosition={setPosition} />
          </div>
          <Button onClick={onSubmit} variant="primary" className="font-bold h-11 my-0">
            {t("profile.saveLocation")}
          </Button>
        </>
      )}
    </div>
  );
};

export default AddressProfile;