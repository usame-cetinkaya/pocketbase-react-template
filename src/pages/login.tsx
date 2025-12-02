import { useEffect, useState } from "react";
import type { AuthProviderInfo } from "pocketbase";
import { Button } from "@/components/ui/button";
import { pb } from "@/lib/pocketbase";

function Login() {
  const [providers, setProviders] = useState<AuthProviderInfo[]>([]);
  function handleLogin(provider: AuthProviderInfo) {
    pb.collection("users")
      .authWithOAuth2({
        provider: provider.name,
      })
      .then(() => {
        window.location.href = "/";
      });
  }

  useEffect(() => {
    pb.collection("users")
      .listAuthMethods()
      .then((methods) => {
        setProviders(methods.oauth2.providers);
      });
  }, []);

  return (
    <>
      <header className="flex h-14 items-center justify-center gap-4 border-b bg-muted/40 px-4">
        <h1 className="text-xl">{import.meta.env.VITE_APP_NAME}</h1>
      </header>
      <div className="w-full max-w-sm mx-auto p-4 flex flex-col gap-6">
        {providers.map((provider) => (
          <Button key={provider.name} onClick={() => handleLogin(provider)}>
            Login with {provider.displayName}
          </Button>
        ))}
      </div>
    </>
  );
}

export default Login;
