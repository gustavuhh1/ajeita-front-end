"use client";

import { AuthContainer } from "./components/auth-container";
import { Suspense } from "react";

export default function AuthPage() {
  return (
    <div className="flex h-svh overflow-hidden">
      <div className="relative hidden w-1/2 lg:flex">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video-auth.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-100" />

        <div className="absolute bottom-16 left-16 max-w-md text-white">
          <h1 className="text-4xl leading-tight font-bold">
            Transforme sua casa com especialistas de confiança.
          </h1>

          <p className="mt-4 text-lg">
            Encontre os melhores profissionais para reparos e reformas
            residenciais em poucos cliques.
          </p>
        </div>
      </div>
      
      <div className="relative flex h-full w-full flex-1 flex-col overflow-y-auto lg:w-1/2">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              Carregando...
            </div>
          }
        >
          <AuthContainer />
        </Suspense>
      </div>
    </div>
  );
}
