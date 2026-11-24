// Hlanganisa ama-vector amabili ku-GPU nge-CUDA. (Add two vectors on the GPU with CUDA.)
//   soga build examples/gpu.zu.soga --cxx nvcc -- -x cu
#include <cuda_runtime.h>
#include <iostream>
#include <vector>

__global__ void hlanganisa_amavektha(const float* a, const float* b, float* c, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) c[i] = a[i] + b[i];
}

int main() {
    constexpr int N = 1 << 20;
    std::vector<float> a(N, 1.0f), b(N, 2.0f), c(N);
    float *da, *db, *dc;
    cudaMalloc(&da, N * sizeof(float));
    cudaMalloc(&db, N * sizeof(float));
    cudaMalloc(&dc, N * sizeof(float));
    cudaMemcpy(da, a.data(), N * sizeof(float), cudaMemcpyHostToDevice);
    cudaMemcpy(db, b.data(), N * sizeof(float), cudaMemcpyHostToDevice);

    dim3 imicu_ebhulokhini(256);
    dim3 amabhulokhi((N + 255) / 256);
    hlanganisa_amavektha<<<amabhulokhi, imicu_ebhulokhini>>>(da, db, dc, N);
    cudaDeviceSynchronize();

    cudaError_t iphutha = cudaGetLastError();
    if (iphutha != cudaSuccess) {
        std::cerr << "Iphutha le-GPU: " << cudaGetErrorString(iphutha) << std::endl;
        return 1;
    }
    cudaMemcpy(c.data(), dc, N * sizeof(float), cudaMemcpyDeviceToHost);
    std::cout << "c[0] = " << c[0] << ", c[N-1] = " << c[N - 1] << std::endl;
    cudaFree(da); cudaFree(db); cudaFree(dc);
    return 0;
}
