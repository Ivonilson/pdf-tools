import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export', // Gera arquivos estáticos
  trailingSlash: true, // Importante para o Firebase
  images: {
    unoptimized: true, // Desativa otimização para export
  }
};

export default nextConfig;
