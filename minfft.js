// Oscar Saharoy 2020

function minfftPadZeros( inputArray ) {

	// pad a copy of inputArray with zeros up to the next power of 2, returning the new array

	const nextPowerOf2  = 2 ** Math.ceil( Math.log2( inputArray.length ) );
	const numberOfZeros = nextPowerOf2 - inputArray.length;

	return [ ...inputArray ].concat( new Array( numberOfZeros ).fill(0) );
}

function minfft( inputArray ) {

	var fftarray = minfftPadZeros( inputArray );
	return mindft(inputArray);
}

function mindft( inputArray ) {

	const N = inputArray.length;
	const x = inputArray;
	const X = Array(N);

	for(var k=0; k<N; ++k) {

		X[k] = {re: 0, im: 0};

		for(var n=0; n<N; ++n) {

			X[k].re += x[n] * Math.cos( -6.283185*k*n / N );
			X[k].im += x[n] * Math.sin( -6.283185*k*n / N );
		}
	}

	return X;
}

function minfftInverse( fourierSeries ) {

	const N = fourierSeries.length;
	const X = fourierSeries;
	const x = Array(N*2);

	for(var k=0; k<N; ++k) {

		X[k] = {re: 0, im: 0};

		for(var n=0; n<N; ++n) {

			X[k].re += x[n] * Math.cos( -6.283185*k*n / N );
			X[k].im += x[n] * Math.sin( -6.283185*k*n / N );
		}
	}

	return X;
}

function minfftToFrequencySpectrum( fourierSeries ) {

	const N = fourierSeries.length;
	const X = fourierSeries;
	var out = Array(N/2);

	for(var k = 0; k < N/2; ++k) {

		const re = X[k].re + (k ? X[N-k].re : 0);
		const im = X[k].im - (k ? X[N-k].im : 0);

		out[k] = Math.sqrt( re**2 + im**2 ) / N;
	}

	return out;
}