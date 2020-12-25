# minfft.js

Just a js implementation of the Cooley-Tukey FFT algorithm. It is really simple (and slow) and only takes signals with length 2^n. There is only 1 function called `fft` which takes an array of real values, and an optional bool argument, `frequencySpectrum`. If this is true (default) then the output is an array of half the length of the input, containing the magnitude of the oscillation at each frequency. If it is false the output is an array of {re,im} objects which is the output straight from the FFT.
