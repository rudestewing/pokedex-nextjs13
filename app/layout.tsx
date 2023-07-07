import ReactQueryProvider from '@/utils/ReactQueryProvider';
import 'antd/dist/reset.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Button } from 'antd';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'nextjs13 pokedex',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={inter.className}>
          <div className="fixed w-full top-0 left-0 right-0 h-[60px] bg-white z-[999] shadow-md">
            <div className="w-full h-full flex items-center max-w-screen-md mx-auto">
              <div>Pokedex</div>
            </div>
          </div>
          <div className="pt-[60px]">{children}</div>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
