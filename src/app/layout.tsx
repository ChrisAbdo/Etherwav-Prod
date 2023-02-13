'use client';

import './globals.css';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Poppins } from '@next/font/google';
import { Toaster } from 'react-hot-toast';
import { ChainId } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

import Navbar from '@/components/Navbar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Info, Music, Radio, Upload, User } from 'lucide-react';
import Link from 'next/link';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

const activeChainId = ChainId.Mumbai;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // if user presses control + k
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={poppins.className}>
        {/* <Navbar />
        {children} */}
        <ThirdwebProvider desiredChainId={activeChainId}>
          <ThemeProvider>
            <Navbar />
            {children}
            <CommandDialog open={open} onOpenChange={setOpen}>
              <div className="mt-3 w-[95%]">
                <CommandInput placeholder="Type a command or search..." />
              </div>

              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation Suggestions">
                  <Link href="/radio">
                    <CommandItem>
                      <Radio className="mr-2 h-4 w-4" />
                      <span className="text-black dark:text-white">Radio</span>
                    </CommandItem>
                  </Link>
                  <Link href="/upload">
                    <CommandItem>
                      <Upload className="mr-2 h-4 w-4" />
                      <span className="text-black dark:text-white">Upload</span>
                    </CommandItem>
                  </Link>
                  <Link href="/profile">
                    <CommandItem>
                      <User className="mr-2 h-4 w-4" />
                      <span className="text-black dark:text-white">
                        Profile
                      </span>
                    </CommandItem>
                  </Link>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Search For Songs & Artists">
                  {/* {nfts.length ? (
                  nfts.map((nft, index) => ( */}
                  <Link
                    // key={index}
                    href="/radio"
                  >
                    <CommandItem>
                      <Music className="mr-2 h-4 w-4" />
                      <span className="text-black dark:text-white">
                        {/* @ts-ignore */}
                        {/* {nft.name} */}
                      </span>

                      <CommandShortcut>
                        {/* @ts-ignore */}
                        <Popover>
                          <PopoverTrigger>
                            <Info className="h-2 w-2" />
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                  More Info
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  Here you will find some more info about this
                                  song and artist.
                                </p>
                              </div>
                              <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="width">Title</Label>

                                  <h1 className="col-span-2 h-8">
                                    {/* @ts-ignore */}
                                    {/* {nft.name} */}
                                  </h1>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="maxWidth">Artist</Label>
                                  <h1 className="col-span-2 h-8 truncate">
                                    {/* @ts-ignore */}
                                    {/* {nft.seller} */}
                                  </h1>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="maxWidth">Heat Count</Label>
                                  <h1 className="col-span-2 h-8 truncate">
                                    {/* @ts-ignore */}
                                    {/* {nft.heatCount} 🔥 */}
                                  </h1>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="height">Audio Source</Label>
                                  <h1
                                    // onClick={() => {
                                    //   // @ts-ignore
                                    //   window.open(nft.image);
                                    // }}
                                    className="col-span-2 h-8 truncate hover:underline cursor-pointer"
                                  >
                                    {/* @ts-ignore */}
                                    {/* {nft.image} */}
                                  </h1>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="maxHeight">
                                    Image Source
                                  </Label>
                                  <h1
                                    // onClick={() => {
                                    //   // @ts-ignore
                                    //   window.open(nft.coverImage);
                                    // }}
                                    className="col-span-2 h-8 truncate hover:underline cursor-pointer"
                                  >
                                    {/* @ts-ignore */}
                                    {/* {nft.coverImage} */}
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </CommandShortcut>
                    </CommandItem>
                  </Link>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
            <Toaster />
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
