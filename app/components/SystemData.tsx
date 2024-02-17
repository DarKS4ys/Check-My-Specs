'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { getGPUTier, TierResult } from 'detect-gpu';
import { Detector } from 'detector-js';
import { RingLoader } from 'react-spinners';
import GPUAnimation from '@/public/gpuAnim.json';
import CPUAnimation from '@/public/CPUAnim.json';
import BrowserAnimation from '@/public/browserAnim.json';
import OSAnim from '@/public/OSAnim.json';
import { InfoCard, InfoLabel, InfoLabelGroup } from '@/app/components/InfoCard';
import Link from 'next/link';

const SystemData = () => {
  const [gpuTier, setGpuTier] = useState<TierResult | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [detector, setDetector] = useState<Detector | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchGpuTier = async () => {
      const tier = await getGPUTier();
      setGpuTier(tier);
    };

    fetchGpuTier();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDetector(new Detector());
    }
  }, []);

  const styleGPUName = (str: string | undefined) => {
    if (!str) {
      return;
    }

    const prefixes = [
      'amd',
      'nvidia',
      'gtx',
      'rtx',
      'rx',
      'quadro',
      'radeon',
      'g',
      'hd',
      'gts',
      'firepro',
      'titan',
      'vega',
      'iris',
      'intel',
    ];
    const words = str.split(' ');

    const capitalizedWords = words.map((word) => {
      const lowercaseWord = word.toLowerCase();
      if (prefixes.includes(lowercaseWord)) {
        return lowercaseWord.toUpperCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    });

    return capitalizedWords.join(' ');
  };

  return (
    <div className="relative flex flex-col h-full my-auto gap-4 items-center justify-center">
      {gpuTier !== null ? (
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4 text-3xl md:text-5xl font-medium">
            <h1>Device Info</h1>
            <h1>{currentTime || 'Loading...'}</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              delay={0}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              label="Graphics Card"
              animation={GPUAnimation}
            >
              <InfoLabel label="Name:" value={styleGPUName(gpuTier.gpu)} />
              <InfoLabelGroup>
                <InfoLabel label="Tier:" value={gpuTier.tier ?? '?'} />
                <InfoLabel label="Fps:" value={gpuTier.fps ?? '?'} />
              </InfoLabelGroup>
              <InfoLabel
                label="Mobile:"
                value={gpuTier.isMobile ?? 'unknown'}
              />
            </InfoCard>

            <InfoCard
              delay={0.1}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              label="Processor"
              reverse
              animation={CPUAnimation}
            >
              <InfoLabel
                label="Manufacturer:"
                value={styleGPUName(detector?.cpu.vendor) || 'unknown'}
              />
              <InfoLabelGroup>
                <InfoLabel label="Cores:" value={detector?.cpu.cores ?? '?'} />
                <InfoLabel
                  label="Platform:"
                  value={detector?.cpu.platform ?? '?'}
                />
              </InfoLabelGroup>
              <InfoLabel
                label="Architecture:"
                value={detector?.cpu.architecture || 'unknown'}
              />
            </InfoCard>

            <InfoCard
              delay={0.2}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              label="Browser"
              animation={BrowserAnimation}
            >
              <InfoLabel
                label="Name:"
                value={detector?.browser.name ?? 'unknown'}
              />
              <InfoLabel
                label="Version:"
                value={detector?.browser.version ?? 'unknown'}
              />
            </InfoCard>

            <InfoCard
              delay={0.3}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              label="Operating System"
              animation={OSAnim}
            >
              <InfoLabel label="Name:" value={detector?.os.name ?? 'unknown'} />
              <InfoLabel
                label="Version:"
                value={detector?.os.versionName ?? 'unknown'}
              />
              <InfoLabel
                label="Full Version:"
                value={detector?.os.version ?? 'unknown'}
              />
            </InfoCard>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 text-center items-center justify-center">
          <RingLoader color="white" size={120} />
          <h1 className="text-3xl md:text-4xl">Checking Device Specs...</h1>
        </div>
      )}

      <div className="flex flex-col gap-1 items-center">
        <h4 className="text-sm text-stone-300">
          2024 © Check My Specs, All rights reserved.
        </h4>
        <div className="text-sm text-stone-400 flex gap-1">
          developed by
          <Link
            className="text-white hover:underline underline-offset-4 flex items-center gap-1"
            href="https://github.com/DarKS4ys"
            rel="noreferrer"
            target="_blank"
          >
            dark
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-3.5 h-3.5"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="fixed -bottom-[25rem] blur-[130px] -z-10 bg-white/25 pointer-events-none w-[40rem] aspect-square rounded-full" />
    </div>
  );
};

const SystemDataClient = () => {
  return (
    <Suspense
      fallback={
        <div className="my-auto">
          <RingLoader color="white" size={120} />
        </div>
      }
    >
      <SystemData />
    </Suspense>
  );
};

export default SystemDataClient;
