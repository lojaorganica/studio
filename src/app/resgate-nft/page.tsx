
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import * as React from 'react';

export default function ResgateNftPage() {
    const [copySuccess, setCopySuccess] = React.useState('');
    const redemptionCode = "BATATMAN-01";

    const handleCopy = () => {
        navigator.clipboard.writeText(redemptionCode).then(() => {
            setCopySuccess('Código Copiado!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, (err) => {
            setCopySuccess('Falha ao copiar');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-background text-foreground p-4 md:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-accent mb-6 hover:text-accent/80">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para a Galeria
                </Link>

                <Card className="bg-card/50 border-border/20">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-bold text-accent">Resgate sua Gota | NFT Exclusiva!</CardTitle>
                        <CardDescription className="text-foreground/80 text-base md:text-lg">
                            Parabéns! Você encontrou uma Gota colecionável. Siga os passos abaixo para resgatar seu NFT exclusivo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="w-full max-w-md mx-auto">
                            <Image
                                src="https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/nft_gotas%2FNFT%2001%20-%20Batatman.webp?alt=media&token=06fb6126-ab32-4a2a-8761-b9278f769956"
                                alt="NFT Gota Batatman"
                                width={800}
                                height={800}
                                className="w-full h-auto object-cover rounded-lg shadow-2xl"
                                priority
                            />
                        </div>

                        <div className="space-y-4 text-center text-foreground/90">
                            <h3 className="text-xl font-semibold">Como Resgatar:</h3>
                            <p>
                                1. Acesse o site <a href="https://gotas.com" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">gotas.com</a>.
                            </p>
                            <p>
                                2. Procure a seção de resgate de Gotas ou NFTs.
                            </p>
                            <p>
                                3. Quando solicitado, insira o código abaixo para validar seu resgate:
                            </p>
                            
                            <div 
                                className="bg-background border-2 border-dashed border-accent p-4 rounded-lg text-center cursor-pointer max-w-sm mx-auto"
                                onClick={handleCopy}
                            >
                                {copySuccess ? (
                                    <p className="text-lg font-bold text-accent">{copySuccess}</p>
                                ) : (
                                    <>
                                        <p className="text-sm text-foreground/70">Clique para copiar o código</p>
                                        <p className="text-2xl font-bold tracking-widest">{redemptionCode}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <a href="https://gotas.com" target="_blank" rel="noopener noreferrer">
                           <Button className="bg-accent hover:bg-accent/80 text-accent-foreground">
                                Ir para Gotas.com agora
                            </Button>
                        </a>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
