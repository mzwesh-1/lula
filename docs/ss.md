# Lula: siSwati reference

> draft - needs review by siSwati speakers

Every word below can be used in `.ss.lula` files. Plain English C++ keeps working too.

## Keywords: Control flow

| siSwati | C++ |
|---|---|
| `nangabe` | `if` |
| `ngalokunye` | `else` |
| `khetsa` | `switch` |
| `simo` | `case` |
| `lokujwayelekile` | `default` |
| `ngesikhatsi` | `while` |
| `yenta` | `do` |
| `jikeleta` | `for` |
| `phuma` | `break` |
| `chubeka` | `continue` |
| `buyisa` | `return` |
| `geja` | `goto` |
| `zama` | `try` |
| `bamba` | `catch` |
| `jikijela` | `throw` |
| `co_lindza` | `co_await` |
| `co_buyisa` | `co_return` |
| `co_veta` | `co_yield` |

## Keywords: Data types

| siSwati | C++ |
|---|---|
| `inombolo` | `int` |
| `ideshimali` | `float` |
| `ideshimali_lekabili` | `double` |
| `luhlavu` | `char` |
| `luhlavu8` | `char8_t` |
| `luhlavu16` | `char16_t` |
| `luhlavu32` | `char32_t` |
| `luhlavu_lolubanti` | `wchar_t` |
| `ibhuli` | `bool` |
| `lite` | `void` |
| `lokufisha` | `short` |
| `lokudze` | `long` |
| `lokunesibonakaliso` | `signed` |
| `lokungenasibonakaliso` | `unsigned` |
| `ngekutentekela` | `auto` |
| `luhlobo_lwa` | `decltype` |

## Keywords: Modifiers

| siSwati | C++ |
|---|---|
| `lokungagucuki` | `const` |
| `ngaphambili` | `constexpr` |
| `hlola_ngaphambili` | `consteval` |
| `cala_ngaphambili` | `constinit` |
| `lokumile` | `static` |
| `langaphandle` | `extern` |
| `lokugucugucukako` | `volatile` |
| `lokugucukako` | `mutable` |
| `ngekhatsi` | `inline` |
| `irejista` | `register` |
| `kwentambo` | `thread_local` |
| `ngalokucacile` | `explicit` |
| `ngaphandle_kwemphutsa` | `noexcept` |
| `condzanisa` | `alignas` |

## Keywords: Classes, objects and structure

| siSwati | C++ |
|---|---|
| `sigaba` | `class` |
| `sakhiwo` | `struct` |
| `inyunyana` | `union` |
| `luhla` | `enum` |
| `lokusobala` | `public` |
| `lokuyimfihlo` | `private` |
| `lokuvikelekile` | `protected` |
| `lokubonakalako` | `virtual` |
| `esikhundleni` | `override` |
| `lokugcina` | `final` |
| `umngani` | `friend` |
| `loku` | `this` |
| `lokusha` | `new` |
| `susa` | `delete` |
| `senti` | `operator` |
| `sifanekiso` | `template` |
| `luhlobo` | `typename` |
| `umcondvo` | `concept` |
| `kudzinga` | `requires` |
| `indzawo_yemagama` | `namespace` |
| `sebentisa` | `using` |
| `libito_lelisha` | `typedef` |
| `tfumela_ngaphandle` | `export` |
| `ngenisa` | `import` |
| `imojula` | `module` |
| `umhlanganisi` | `asm` |

## Keywords: Casts and compile-time

| siSwati | C++ |
|---|---|
| `gucula` | `static_cast` |
| `gucula_ngesikhatsi` | `dynamic_cast` |
| `gucula_lokungagucuki` | `const_cast` |
| `gucula_ngemandla` | `reinterpret_cast` |
| `tfola_luhlobo` | `typeid` |
| `bukhulu_be` | `sizeof` |
| `kucondzana` | `alignof` |
| `cinisekisa` | `static_assert` |

## Keywords: Constants

| siSwati | C++ |
|---|---|
| `liciniso` | `true` |
| `emanga` | `false` |
| `lutfo` | `nullptr` |

## Keywords: Word operators

| siSwati | C++ |
|---|---|
| `futsi` | `and` |
| `nome` | `or` |
| `cha` | `not` |
| `akulingani` | `not_eq` |
| `futsi_lingana` | `and_eq` |
| `nome_lingana` | `or_eq` |
| `nome_kuphela` | `xor` |
| `nome_kuphela_lingana` | `xor_eq` |
| `futsi_bhithi` | `bitand` |
| `nome_bhithi` | `bitor` |
| `phendvula_bhithi` | `compl` |

## Preprocessor

| siSwati | C++ |
|---|---|
| `#faka` | `#include` |
| `#chaza` | `#define` |
| `#sula` | `#undef` |
| `#nangabe` | `#if` |
| `#nangabe_kuchaziwe` | `#ifdef` |
| `#nangabe_kungachazwanga` | `#ifndef` |
| `#ngalokunye_nangabe` | `#elif` |
| `#ngalokunye_nangabe_kuchaziwe` | `#elifdef` |
| `#ngalokunye_nangabe_kungachazwanga` | `#elifndef` |
| `#ngalokunye` | `#else` |
| `#ceda_nangabe` | `#endif` |
| `#umugca` | `#line` |
| `#liphutsa` | `#error` |
| `#secwayiso` | `#warning` |
| `#umyalo` | `#pragma` |

## Header files

| siSwati | C++ |
|---|---|
| `<konkhe>` | `<bits/stdc++.h>` |
| `<kungena_nekuphuma>` | `<iostream>` |
| `<umbhalo>` | `<string>` |
| `<licoco>` | `<vector>` |
| `<imephu>` | `<map>` |
| `<imephu_lengahlelwanga>` | `<unordered_map>` |
| `<lisethi>` | `<set>` |
| `<lisethi_lengahlelwanga>` | `<unordered_set>` |
| `<lulayini>` | `<queue>` |
| `<inchwaba>` | `<stack>` |
| `<lulayini_lokabili>` | `<deque>` |
| `<luhla_loluhlanganisiwe>` | `<list>` |
| `<luhide>` | `<array>` |
| `<emasu>` | `<algorithm>` |
| `<tibalo>` | `<cmath>` |
| `<umtapo_c>` | `<cstdlib>` |
| `<sikhatsi>` | `<ctime>` |
| `<emafayela>` | `<fstream>` |
| `<umfudlana_wembhalo>` | `<sstream>` |
| `<kuhlela_lokuphumako>` | `<iomanip>` |
| `<lusito>` | `<utility>` |
| `<inkhumbulo>` | `<memory>` |
| `<imisebenti>` | `<functional>` |
| `<tinombolo>` | `<numeric>` |
| `<imingcele>` | `<limits>` |
| `<imingcele_c>` | `<climits>` |
| `<tinombolo_letinesayizi>` | `<cstdint>` |
| `<umbhalo_c>` | `<cstring>` |
| `<tinhlavu>` | `<cctype>` |
| `<sikhatsi_lesinembile>` | `<chrono>` |
| `<intambo>` | `<thread>` |
| `<sivalo>` | `<mutex>` |
| `<lokwehlukile>` | `<exception>` |
| `<emaphutsa>` | `<stdexcept>` |
| `<sihambi>` | `<iterator>` |
| `<licembu>` | `<tuple>` |
| `<lokukhetsekako>` | `<optional>` |
| `<lokungahleliwe>` | `<random>` |
| `<emabhithi>` | `<bitset>` |

## Library: Core

| siSwati | C++ |
|---|---|
| `lokuyinhloko` | `main` |
| `sisekelo` | `std` |
| `kuchaziwe` | `defined` |
| `phrinta` | `printf` |
| `skena` | `scanf` |

## Library: Input / output and files

| siSwati | C++ |
|---|---|
| `bhala` | `std::cout` |
| `fundza` | `std::cin` |
| `bhala_liphutsa` | `std::cerr` |
| `bhala_umlandvo` | `std::clog` |
| `umugca` | `std::endl` |
| `fundza_umugca` | `std::getline` |
| `geleta` | `std::flush` |
| `emadeshimali_lacinile` | `std::fixed` |
| `setha_kunemba` | `std::setprecision` |
| `setha_bubanti` | `std::setw` |
| `lifayela_lekufundza` | `std::ifstream` |
| `lifayela_lekubhala` | `std::ofstream` |
| `lifayela` | `std::fstream` |
| `umfudlana_wembhalo` | `std::stringstream` |
| `umfudlana_wekufundza` | `std::istringstream` |
| `umfudlana_wekubhala` | `std::ostringstream` |

## Library: Data types

| siSwati | C++ |
|---|---|
| `inombolo_yebukhulu` | `std::size_t` |
| `inombolo8` | `std::int8_t` |
| `inombolo16` | `std::int16_t` |
| `inombolo32` | `std::int32_t` |
| `inombolo64` | `std::int64_t` |
| `inombolo_u8` | `std::uint8_t` |
| `inombolo_u16` | `std::uint16_t` |
| `inombolo_u32` | `std::uint32_t` |
| `inombolo_u64` | `std::uint64_t` |

## Library: Containers (STL)

| siSwati | C++ |
|---|---|
| `umbhalo` | `std::string` |
| `licoco` | `std::vector` |
| `imephu` | `std::map` |
| `imephu_lengahlelwanga` | `std::unordered_map` |
| `imephu_leminyenti` | `std::multimap` |
| `lisethi` | `std::set` |
| `lisethi_lengahlelwanga` | `std::unordered_set` |
| `lisethi_leminyenti` | `std::multiset` |
| `lulayini` | `std::queue` |
| `lulayini_lolubalulekile` | `std::priority_queue` |
| `inchwaba` | `std::stack` |
| `lulayini_lokabili` | `std::deque` |
| `luhla_loluhlanganisiwe` | `std::list` |
| `luhide` | `std::array` |
| `liphea` | `std::pair` |
| `licembu` | `std::tuple` |
| `emabhithi` | `std::bitset` |
| `lokukhetsekako` | `std::optional` |
| `yenta_liphea` | `std::make_pair` |
| `yenta_licembu` | `std::make_tuple` |
| `tsatsa` | `std::get` |
| `bopha` | `std::tie` |
| `hambisa` | `std::move` |

## Library: Smart pointers

| siSwati | C++ |
|---|---|
| `sikhombi_sinye` | `std::unique_ptr` |
| `sikhombi_lesabelwanako` | `std::shared_ptr` |
| `sikhombi_lesibutsakatsaka` | `std::weak_ptr` |
| `yenta_sinye` | `std::make_unique` |
| `yenta_lesabelwanako` | `std::make_shared` |

## Library: Algorithms

| siSwati | C++ |
|---|---|
| `hlela` | `std::sort` |
| `hlehlisa` | `std::reverse` |
| `tfola` | `std::find` |
| `bala` | `std::count` |
| `lokukhulu` | `std::max` |
| `lokuncane` | `std::min` |
| `intfo_lenkhulu` | `std::max_element` |
| `intfo_lencane` | `std::min_element` |
| `coca_sibalo` | `std::accumulate` |
| `sesha_kabili` | `std::binary_search` |
| `umngcele_lophansi` | `std::lower_bound` |
| `umngcele_lophetulu` | `std::upper_bound` |
| `gcwalisa` | `std::fill` |
| `kopisha` | `std::copy` |
| `gucula_konkhe` | `std::transform` |
| `ngayinye_ngayinye` | `std::for_each` |
| `susa_lokuphindziwe` | `std::unique` |
| `kuhlelwa_lokulandzelako` | `std::next_permutation` |
| `shintshanisa` | `std::swap` |
| `landzelanisa` | `std::iota` |

## Library: Math

| siSwati | C++ |
|---|---|
| `linani_leliphelele` | `std::abs` |
| `imphandze` | `std::sqrt` |
| `emandla` | `std::pow` |
| `khuphula` | `std::ceil` |
| `ehlisa` | `std::floor` |
| `sondzeta` | `std::round` |
| `isayini` | `std::sin` |
| `ikhosayini` | `std::cos` |
| `ithenjenti` | `std::tan` |
| `ilogi` | `std::log` |
| `ilogi10` | `std::log10` |
| `ieksiphonenti` | `std::exp` |
| `ihayiphothenusi` | `std::hypot` |
| `insalela` | `std::fmod` |
| `sehlukanisi_lesikhulu` | `std::gcd` |
| `liphindvaphindva_lelincane` | `std::lcm` |
| `imingcele_yetinombolo` | `std::numeric_limits` |
| `lokungahleliwe` | `std::rand` |
| `hlanyela_lokungahleliwe` | `std::srand` |
| `sikhatsi` | `std::time` |

## Library: Strings and characters

| siSwati | C++ |
|---|---|
| `kumbhalo` | `std::to_string` |
| `kunombolo` | `std::stoi` |
| `kunombolo_lendze` | `std::stol` |
| `kudeshimali` | `std::stod` |
| `kulokukhulu` | `std::toupper` |
| `kulokuncane` | `std::tolower` |
| `yidijithi` | `std::isdigit` |
| `yinhlavu` | `std::isalpha` |
| `yisikhala` | `std::isspace` |
| `ngulokukhulu` | `std::isupper` |
| `ngulokuncane` | `std::islower` |

## Library: Exceptions

| siSwati | C++ |
|---|---|
| `lokwehlukile` | `std::exception` |
| `liphutsa_lekusebenta` | `std::runtime_error` |
| `liphutsa_lekucabanga` | `std::logic_error` |
| `ngaphandle_kwebubanti` | `std::out_of_range` |
| `imphikiswano_lengakalungi` | `std::invalid_argument` |

## Library: Threads

| siSwati | C++ |
|---|---|
| `intambo` | `std::thread` |
| `sivalo` | `std::mutex` |
| `umcaphi_wesivalo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| siSwati | C++ |
|---|---|
| `bukhulu` | `size` |
| `budze` | `length` |
| `kute_lutfo` | `empty` |
| `engeta_ekugcineni` | `push_back` |
| `susa_ekugcineni` | `pop_back` |
| `engeta_ekucaleni` | `push_front` |
| `susa_ekucaleni` | `pop_front` |
| `beka` | `emplace` |
| `beka_ekugcineni` | `emplace_back` |
| `engeta` | `push` |
| `khipha` | `pop` |
| `lokuphetulu` | `top` |
| `embili` | `front` |
| `emuva` | `back` |
| `kucala` | `begin` |
| `kuphela` | `end` |
| `kucala_emuva` | `rbegin` |
| `kuphela_emuva` | `rend` |
| `sula_konkhe` | `clear` |
| `faka_ekhatsi` | `insert` |
| `cisha` | `erase` |
| `endzaweni` | `at` |
| `incenye` | `substr` |
| `namatsisela` | `append` |
| `umbhalo_c` | `c_str` |
| `catsanisa` | `compare` |
| `faka_esikhundleni` | `replace` |
| `shintsha_bukhulu` | `resize` |
| `gcina_indzawo` | `reserve` |
| `umtsamo` | `capacity` |
| `kwekucala` | `first` |
| `kwesibili` | `second` |
| `kwentenjani` | `what` |
| `vula` | `open` |
| `vala` | `close` |
| `kuvulekile` | `is_open` |
| `kuphela_kwelifayela` | `eof` |
| `umbhalo_wonkhe` | `str` |
| `setha_kabusha` | `reset` |
| `khulula` | `release` |
| `hlanganisa` | `join` |
| `hlukanisa` | `detach` |
| `khiya` | `lock` |
| `vula_sikhiya` | `unlock` |

## Library: Arduino / robots

| siSwati | C++ |
|---|---|
| `cala` | `setup` |
| `phindza_phindza` | `loop` |
| `setha_liphini` | `pinMode` |
| `bhala_idijithali` | `digitalWrite` |
| `fundza_idijithali` | `digitalRead` |
| `fundza_ianalogi` | `analogRead` |
| `bhala_ianalogi` | `analogWrite` |
| `lindza` | `delay` |
| `lindza_emamayikhro` | `delayMicroseconds` |
| `emamilisekhondi` | `millis` |
| `emamayikhrosekhondi` | `micros` |
| `vimbela` | `constrain` |
| `ithoni` | `tone` |
| `misa_ithoni` | `noTone` |
| `namatsisela_kuphazamiseka` | `attachInterrupt` |
| `PHETULU` | `HIGH` |
| `PHANSI` | `LOW` |
| `LOKUPHUMAKO` | `OUTPUT` |
| `LOKUNGENAKO` | `INPUT` |
| `LOKUNGENAKO_KUDONSIWE` | `INPUT_PULLUP` |
| `ILED_LEYAKHIWE` | `LED_BUILTIN` |
| `Siriyali` | `Serial` |
| `khombisa` | `print` |
| `khombisa_umugca` | `println` |
| `lokutfolakalako` | `available` |
| `fundza_ibhayithi` | `read` |
| `bhala_ibhayithi` | `write` |

# Library packs

A pack switches on when you include one of its headers (in your language or in English).

## Arduino libraries

Headers: `#faka <iservo>` = `<Servo.h>`, `#faka <lucingo>` = `<Wire.h>`, `#faka <libhasi_spi>` = `<SPI.h>`, `#faka <inkhumbulo_lehlalako>` = `<EEPROM.h>`

| siSwati | C++ |
|---|---|
| `Iservo` | `Servo` |
| `xhuma` | `attach` |
| `bhala_emamayikhrosekhondi` | `writeMicroseconds` |
| `Lucingo` | `Wire` |
| `cala_kutfumela` | `beginTransmission` |
| `ceda_kutfumela` | `endTransmission` |
| `cela_ku` | `requestFrom` |
| `nakutfolwa` | `onReceive` |
| `nakucelwa` | `onRequest` |
| `Libhasi_spi` | `SPI` |
| `dlulisa` | `transfer` |
| `Inkhumbulo_lehlalako` | `EEPROM` |
| `faka_kuyo` | `put` |
| `vuselela` | `update` |

## Arduino (always on)

| siSwati | C++ |
|---|---|
| `khetsa_ngekungahleliwe` | `random` |
| `inhlanyelo_yekungahleliwe` | `randomSeed` |
| `linganisa_kabusha` | `map` |
| `linganisa_liphalsi` | `pulseIn` |
| `liphini_kuya_ekuphazamisekeni` | `digitalPinToInterrupt` |
| `NAKUKHUPHUKA` | `RISING` |
| `NAKWEHLA` | `FALLING` |
| `NAKUSHINTSHA` | `CHANGE` |
| `vumela_kuphazamiseka` | `interrupts` |
| `vimba_kuphazamiseka` | `noInterrupts` |
| `fundza_inombolo` | `parseInt` |
| `fundza_ideshimali` | `parseFloat` |
| `fundza_umbhalo` | `readString` |
| `fundza_umbhalo_kute` | `readStringUntil` |
| `kube_yinombolo` | `toInt` |
| `kube_yideshimali` | `toFloat` |
| `indzawo_ya` | `indexOf` |
| `incenye_yembhalo` | `substring` |
| `sika_tikhala` | `trim` |
| `kube_lokukhulu` | `toUpperCase` |
| `kube_lokuncane` | `toLowerCase` |
| `icala_nga` | `startsWith` |
| `iphela_nga` | `endsWith` |

## CUDA

Headers: `#faka <igpu>` = `<cuda_runtime.h>`

| siSwati | C++ |
|---|---|
| `umsebenti_wegpu` | `__global__` |
| `kwegpu` | `__device__` |
| `kwekhompyutha` | `__host__` |
| `lokwabelwanako_gpu` | `__shared__` |
| `vumelanisa_tintambo` | `__syncthreads` |
| `inombolo_yentambo` | `threadIdx` |
| `inombolo_yelibhulokhi` | `blockIdx` |
| `bukhulu_belibhulokhi` | `blockDim` |
| `bukhulu_belugridi` | `gridDim` |
| `bukhulu3` | `dim3` |
| `gpu_beka_inkhumbulo` | `cudaMalloc` |
| `gpu_khulula_inkhumbulo` | `cudaFree` |
| `gpu_kopisha_inkhumbulo` | `cudaMemcpy` |
| `KUSUKA_KHOMPYUTHA_KUYA_GPU` | `cudaMemcpyHostToDevice` |
| `KUSUKA_GPU_KUYA_KHOMPYUTHA` | `cudaMemcpyDeviceToHost` |
| `gpu_lindza_icede` | `cudaDeviceSynchronize` |
| `gpu_liphutsa_lekugcina` | `cudaGetLastError` |
| `gpu_umbhalo_weliphutsa` | `cudaGetErrorString` |
| `Liphutsa_legpu` | `cudaError_t` |
| `GPU_KUPHUMELELE` | `cudaSuccess` |

## Eigen

Headers: `#faka <ematriki>` = `<Eigen/Dense>`, `#faka <ematriki_sisekelo>` = `<Eigen/Core>`, `#faka <jiyomethri>` = `<Eigen/Geometry>`

| siSwati | C++ |
|---|---|
| `ematriki` | `Eigen` |
| `Imatriki` | `Eigen::MatrixXd` |
| `Livektha` | `Eigen::VectorXd` |
| `Imatriki3` | `Eigen::Matrix3d` |
| `Imatriki4` | `Eigen::Matrix4d` |
| `Livektha3` | `Eigen::Vector3d` |
| `Imatriki_yeluhlobo` | `Eigen::Matrix` |
| `Ikhwatheniyoni` | `Eigen::Quaterniond` |
| `Ingila_ne_eksisi` | `Eigen::AngleAxisd` |
| `Bunye` | `Identity` |
| `Lizero` | `Zero` |
| `Konkhe_kunye` | `Ones` |
| `Ngekungahleliwe` | `Random` |
| `phendvula_imatriki` | `transpose` |
| `lokuphambene` | `inverse` |
| `sincumo` | `determinant` |
| `budze_belivektha` | `norm` |
| `ilinganisiwe` | `normalized` |
| `umkhicito_welichashati` | `dot` |
| `umkhicito_wesiphambano` | `cross` |
| `xazulula` | `solve` |
| `hlukanisa_qr` | `colPivHouseholderQr` |
| `cishe_kuyalingana` | `isApprox` |
| `Eksisi_X` | `UnitX` |
| `Eksisi_Y` | `UnitY` |
| `Eksisi_Z` | `UnitZ` |
| `ibe_matriki` | `matrix` |

## OpenCV

Headers: `#faka <kubona>` = `<opencv2/opencv.hpp>`, `#faka <kubona_sisekelo>` = `<opencv2/core.hpp>`, `#faka <kubona_titfombe>` = `<opencv2/imgproc.hpp>`, `#faka <kubona_emawindi>` = `<opencv2/highgui.hpp>`, `#faka <kubona_ividiyo>` = `<opencv2/videoio.hpp>`, `#faka <kubona_kutfola_tintfo>` = `<opencv2/objdetect.hpp>`

| siSwati | C++ |
|---|---|
| `kubona` | `cv` |
| `Sitfombe` | `cv::Mat` |
| `fundza_sitfombe` | `cv::imread` |
| `londvoloza_sitfombe` | `cv::imwrite` |
| `khombisa_sitfombe` | `cv::imshow` |
| `lindza_inkinobho` | `cv::waitKey` |
| `dala_liwindi` | `cv::namedWindow` |
| `vala_emawindi_onkhe` | `cv::destroyAllWindows` |
| `gucula_umbala` | `cv::cvtColor` |
| `UMBALA_KUYA_KUMPHUNGA` | `cv::COLOR_BGR2GRAY` |
| `UMBALA_KUYA_KU_HSV` | `cv::COLOR_BGR2HSV` |
| `UMBALA_KUYA_KU_RGB` | `cv::COLOR_BGR2RGB` |
| `fiphalisa` | `cv::GaussianBlur` |
| `tfola_imiphetfo` | `cv::Canny` |
| `umkhawulo` | `cv::threshold` |
| `UMKHAWULO_LOMBILI` | `cv::THRESH_BINARY` |
| `shintsha_bukhulu_besitfombe` | `cv::resize` |
| `dvweba_lunxande` | `cv::rectangle` |
| `dvweba_indingilizi` | `cv::circle` |
| `dvweba_umugca` | `cv::line` |
| `bhala_esitfombeni` | `cv::putText` |
| `Liphuzu` | `cv::Point` |
| `Bubanti_nebudze` | `cv::Size` |
| `Linani_lembala` | `cv::Scalar` |
| `Sifundza` | `cv::Rect` |
| `Likhamera` | `cv::VideoCapture` |
| `ivuliwe` | `isOpened` |
| `imigca` | `rows` |
| `emakholamu` | `cols` |
| `titeshi` | `channels` |
| `yenta_ikhophi` | `clone` |
| `kopishela_ku` | `copyTo` |
| `tfola_tinhlaka` | `cv::findContours` |
| `dvweba_tinhlaka` | `cv::drawContours` |
| `indzawo_yelihlaka` | `cv::contourArea` |
| `ngekhatsi_kwebubanti` | `cv::inRange` |
| `Umehlukanisi` | `cv::CascadeClassifier` |
| `tfola_tintfo` | `detectMultiScale` |
| `layisha` | `load` |
| `FUNDZA_NGEMBALA` | `cv::IMREAD_COLOR` |
| `FUNDZA_NGEMPHUNGA` | `cv::IMREAD_GRAYSCALE` |
| `IFONTI_LELULA` | `cv::FONT_HERSHEY_SIMPLEX` |
| `Liphikseli` | `cv::Vec3b` |
| `kugcwele_nga0` | `zeros` |
| `kugcwele_nga1` | `ones` |
| `TINHLAKA_TANGAPHANDLE` | `cv::RETR_EXTERNAL` |
| `TINHLAKA_LETILULA` | `cv::CHAIN_APPROX_SIMPLE` |
| `libhokisi_lelitungeletile` | `cv::boundingRect` |
| `UMBALA_8BIT_3` | `CV_8UC3` |
| `bubanti` | `width` |
| `kuphakama` | `height` |

## ROS 2

Headers: `#faka <ros2>` = `<rclcpp/rclcpp.hpp>`, `#faka <umlayeto_wembhalo>` = `<std_msgs/msg/string.hpp>`, `#faka <umlayeto_wenombolo>` = `<std_msgs/msg/int32.hpp>`, `#faka <umlayeto_wedeshimali>` = `<std_msgs/msg/float64.hpp>`, `#faka <umlayeto_webhuli>` = `<std_msgs/msg/bool.hpp>`, `#faka <umyalo_wejubane>` = `<geometry_msgs/msg/twist.hpp>`, `#faka <kuskena_kwelaser>` = `<sensor_msgs/msg/laser_scan.hpp>`, `#faka <sitfombe_senzwa>` = `<sensor_msgs/msg/image.hpp>`

| siSwati | C++ |
|---|---|
| `ros` | `rclcpp` |
| `cala_ros` | `rclcpp::init` |
| `vala_ros` | `rclcpp::shutdown` |
| `gijima_ros` | `rclcpp::spin` |
| `gijima_ros_kancane` | `rclcpp::spin_some` |
| `ros_isaphila` | `rclcpp::ok` |
| `Lifindvo` | `rclcpp::Node` |
| `Umsakati` | `rclcpp::Publisher` |
| `Kubhalisa` | `rclcpp::Subscription` |
| `Sibali_sikhatsi` | `rclcpp::TimerBase` |
| `dala_umsakati` | `create_publisher` |
| `dala_kubhalisa` | `create_subscription` |
| `dala_sibali_sikhatsi` | `create_wall_timer` |
| `sakata` | `publish` |
| `umbhali_wemlandvo` | `get_logger` |
| `ROS_LWATI` | `RCLCPP_INFO` |
| `ROS_SECWAYISO` | `RCLCPP_WARN` |
| `ROS_LIPHUTSA` | `RCLCPP_ERROR` |
| `Sikhombi` | `SharedPtr` |
| `idatha` | `data` |
| `lokucondzile` | `linear` |
| `kujikaleta` | `angular` |
| `emabanga` | `ranges` |
| `memetela_iphalamitha` | `declare_parameter` |
| `tfola_iphalamitha` | `get_parameter` |
| `umlayeto_wembhalo` | `std_msgs::msg::String` |
| `umlayeto_wenombolo` | `std_msgs::msg::Int32` |
| `umlayeto_wedeshimali` | `std_msgs::msg::Float64` |
| `umlayeto_webhuli` | `std_msgs::msg::Bool` |
| `umyalo_wejubane` | `geometry_msgs::msg::Twist` |
| `kuskena_kwelaser` | `sensor_msgs::msg::LaserScan` |
| `sitfombe_senzwa` | `sensor_msgs::msg::Image` |

## Standard library extras (always on)

| siSwati | C++ |
|---|---|
| `idatha` | `data` |

## PyTorch (libtorch)

Headers: `#faka <kufundza_kwemshini>` = `<torch/torch.h>`

| siSwati | C++ |
|---|---|
| `kufundza_kwemshini` | `torch` |
| `Ithensa` | `torch::Tensor` |
| `yenta_ithensa` | `torch::tensor` |
| `kugcwele_nga0` | `torch::zeros` |
| `kugcwele_nga1` | `torch::ones` |
| `ithensa_lengahleliwe` | `torch::rand` |
| `ithensa_lengahleliwe_lejwayelekile` | `torch::randn` |
| `setha_inhlanyelo` | `torch::manual_seed` |
| `Incenye_yenethiwekhi` | `torch::nn::Module` |
| `Lungcimba_lolucondzile` | `torch::nn::Linear` |
| `Lungcimba_lwekuhlanganisa2d` | `torch::nn::Conv2d` |
| `sivuseleli_relu` | `torch::relu` |
| `ilogi_yemathuba` | `torch::log_softmax` |
| `kulahlekelwa_kwesikwele` | `torch::mse_loss` |
| `kulahlekelwa_kwemathuba` | `torch::nll_loss` |
| `Sitfutfukisi_SGD` | `torch::optim::SGD` |
| `Sitfutfukisi_Adam` | `torch::optim::Adam` |
| `Lithulusi` | `torch::Device` |
| `KU_GPU` | `torch::kCUDA` |
| `KU_CPU` | `torch::kCPU` |
| `igpu_ikhona` | `torch::cuda::is_available` |
| `londvoloza_imodeli` | `torch::save` |
| `layisha_imodeli` | `torch::load` |
| `Umcaphi_longafundzi` | `torch::NoGradGuard` |
| `bhalisa_incenye` | `register_module` |
| `dlulisela_embili` | `forward` |
| `buyela_emuva` | `backward` |
| `sula_kutsambekela` | `zero_grad` |
| `tsatsa_sinyatselo` | `step` |
| `yisa_ku` | `to` |
| `linani_linye` | `item` |
| `buka_njenge` | `view` |
| `shintsha_simo` | `reshape` |
| `phindvaphindva_ematriki` | `matmul` |
| `sibalo_sethensa` | `sum` |
| `umlinganiso_wethensa` | `mean` |
| `inkhomba_lenkhulu` | `argmax` |
| `emaphalamitha` | `parameters` |
| `cecesha` | `train` |
| `hlola_imodeli` | `eval` |
