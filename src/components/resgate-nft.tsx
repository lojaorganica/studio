
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import * as React from 'react';

export function ResgateNft() {
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
        <div className="flex flex-col w-full text-foreground pt-2 md:pt-4">
            <div className="w-full max-w-4xl mx-auto px-4">
                <Card className="bg-card/50 border-border/20">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-bold text-accent">Resgate sua Gota | NFT EXCLUSIVA!</CardTitle>
                        <CardDescription className="text-foreground/80 text-base md:text-lg pt-2">
                           Parabéns! Você encontrou uma Gota colecionável. Então corra porque são apenas 900 NFTs do Batatman, ativos digitais que vão valorizar com o tempo e trazem - na área de benefícios - um desconto para a compra de mel orgânico em uma de nossas feiras orgânicas. Siga os passos abaixo para resgatar seu NFT exclusivo.
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
                                2. Faça seu cadastro/login com seu e-mail do Google, Apple ou carteira Metamask.
                            </p>
                            <p>
                                3. Insira o código abaixo para validar o resgate de sua gotinha (NFT) do Batatman:
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
