import { Button, Input, Skeleton, Card, } from "@heroui/react";
import { useState } from "react";

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // شبیه‌سازی بارگذاری اولیه صفحه
  useState(() => {
    setTimeout(() => setIsPageLoading(false), 1500);
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  if (isPageLoading) {
    return (
      <Card className="w-96 p-6 space-y-4">
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-1/2 rounded-lg" />
      </Card>
    );
  }

  return (
    <Card className="w-96 p-6">
      
        <h1 className="text-2xl font-bold">ورود</h1>
        <Input label="ایمیل" placeholder="example@site.com" />
        <Input label="رمز عبور" type="password" />
        <Button 
          color="primary" 
          isLoading={isLoading}
          onPress={handleLogin}
          className="w-full"
        >
          ورود
        </Button>

    </Card>
  );
};

export default LoadingAnimation