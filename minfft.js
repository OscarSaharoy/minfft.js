// Oscar Saharoy 2020

function fft( inputSignal, frequencySpectrum = true ) {

    // radix-2 fast fourier transform
    // future improvements: in-place fft, handling of non power of 2 signals, builtin windowing

    const x = inputSignal; // input signal - must be power of 2
    const N = x.length;    // sequence length
    const X = Array(N);    // fourier coefficients (frequency domain)

    // handle base case where N==1
    if( N == 1 )
        return [ { re: x[0], im: 0 } ];

    // split samples into even and odd
    const evens = [];
    const odds  = [];

    for(var i=0; i<N; ++i) {

        if( i%2 ) odds.push( x[i] );
        else     evens.push( x[i] );
    }

    // do fft on even and odd samples
    const E = fft(evens, false);
    const O = fft(odds,  false);

    // butterfly the results in E and O
    for(var k=0; k<N/2; ++k) {

        const Wre     = Math.cos( 6.283185*k/N );
        const Wim     = Math.sin( 6.283185*k/N );

        const W_Ok_re = Wre * O[k].re - Wim * O[k].im;
        const W_Ok_im = Wim * O[k].re + Wre * O[k].im;

        X[k]          = {};
        X[k].re       = E[k].re + W_Ok_re;
        X[k].im       = E[k].im + W_Ok_im;
  
        X[k+N/2]      = {};
        X[k+N/2].re   = E[k].re - W_Ok_re;
        X[k+N/2].im   = E[k].im - W_Ok_im;
    }

    // return the complex fourier coefficients if we don't want the frequency spectrum
    if( !frequencySpectrum ) return X;

    // otherwise calculate spectrum and return
    const p = X.slice(0, N/2 | 0).map( Xk => Math.sqrt( Xk.re**2 + Xk.im**2 ) * 2/N ); // power spectrum - amplitude of each frequency component up to N/2 (Nyquist freq)
    p[0]   /= 2; // correct artefact on dc component

    return p;
}