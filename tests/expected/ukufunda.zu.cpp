// Ukufunda komshini nge-PyTorch (libtorch): fundisa inethiwekhi ukuthi y = 2x + 1.
// Machine learning with PyTorch's C++ API: teach a network that y = 2x + 1.
//   export LIBTORCH=/path/to/libtorch && lula run examples/ukufunda.zu.lula
#include <torch/torch.h>
#include <iostream>

struct Inethiwekhi : torch::nn::Module {
    torch::nn::Linear ungqimba1{nullptr}, ungqimba2{nullptr};
    Inethiwekhi() {
        ungqimba1 = register_module("ungqimba1", torch::nn::Linear(1, 16));
        ungqimba2 = register_module("ungqimba2", torch::nn::Linear(16, 1));
    }
    torch::Tensor forward(torch::Tensor x) {
        return ungqimba2->forward(torch::relu(ungqimba1->forward(x)));
    }
};

int main() {
    torch::manual_seed(42);
    torch::Device idivayisi = torch::cuda::is_available() ? torch::kCUDA : torch::kCPU;
    Inethiwekhi inethiwekhi;
    inethiwekhi.to(idivayisi);

    torch::Tensor x = torch::rand({64, 1}).to(idivayisi) * 4 - 2;
    torch::Tensor y = 2 * x + 1;
    torch::optim::Adam isithuthukisi(inethiwekhi.parameters(), 0.05);

    for (int inkathi = 1; inkathi <= 300; inkathi++) {
        isithuthukisi.zero_grad();
        torch::Tensor ukulahlekelwa = torch::mse_loss(inethiwekhi.forward(x), y);
        ukulahlekelwa.backward();
        isithuthukisi.step();
        if (inkathi % 100 == 0) std::cout << "inkathi " << inkathi << ": ukulahlekelwa = " << ukulahlekelwa.item<float>() << std::endl;
    }

    torch::NoGradGuard umqaphi;
    torch::Tensor ukuhlola = torch::tensor({{0.5f}}).to(idivayisi);
    std::cout << "f(0.5) = " << inethiwekhi.forward(ukuhlola).item<float>() << " (kufanele kube ngu-2)" << std::endl;
    return 0;
}
