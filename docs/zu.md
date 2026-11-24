# Soga: isiZulu reference

> draft - needs review by isiZulu speakers

Every word below can be used in `.zu.soga` files. Plain English C++ keeps working too.

## Keywords: Control flow

| isiZulu | C++ |
|---|---|
| `uma` | `if` |
| `kungenjalo` | `else` |
| `khetha` | `switch` |
| `isimo` | `case` |
| `okujwayelekile` | `default` |
| `ngenkathi` | `while` |
| `yenza` | `do` |
| `jikeleza` | `for` |
| `phuma` | `break` |
| `qhubeka` | `continue` |
| `buyisa` | `return` |
| `eqa` | `goto` |
| `zama` | `try` |
| `bamba` | `catch` |
| `phonsa` | `throw` |
| `co_linda` | `co_await` |
| `co_buyisa` | `co_return` |
| `co_veza` | `co_yield` |

## Keywords: Data types

| isiZulu | C++ |
|---|---|
| `inombolo` | `int` |
| `idesimali` | `float` |
| `idesimali_kabili` | `double` |
| `uhlamvu` | `char` |
| `uhlamvu8` | `char8_t` |
| `uhlamvu16` | `char16_t` |
| `uhlamvu32` | `char32_t` |
| `uhlamvu_olubanzi` | `wchar_t` |
| `ibhuli` | `bool` |
| `ize` | `void` |
| `fushane` | `short` |
| `ende` | `long` |
| `onophawu` | `signed` |
| `ongenaphawu` | `unsigned` |
| `okuzenzakalelayo` | `auto` |
| `uhlobo_lwa` | `decltype` |

## Keywords: Modifiers

| isiZulu | C++ |
|---|---|
| `engaguquki` | `const` |
| `ngaphambili` | `constexpr` |
| `hlola_ngaphambili` | `consteval` |
| `qala_ngaphambili` | `constinit` |
| `okumile` | `static` |
| `okwangaphandle` | `extern` |
| `okuguquguqukayo` | `volatile` |
| `okuguqukayo` | `mutable` |
| `ngaphakathi` | `inline` |
| `irejista` | `register` |
| `okomucu` | `thread_local` |
| `ngokucacile` | `explicit` |
| `ngaphandle_kwephutha` | `noexcept` |
| `qondanisa` | `alignas` |

## Keywords: Classes, objects and structure

| isiZulu | C++ |
|---|---|
| `isigaba` | `class` |
| `isakhiwo` | `struct` |
| `inyunyana` | `union` |
| `uhlu` | `enum` |
| `umphakathi` | `public` |
| `imfihlo` | `private` |
| `okuvikelwe` | `protected` |
| `okubonakalayo` | `virtual` |
| `esikhundleni` | `override` |
| `okokugcina` | `final` |
| `umngane` | `friend` |
| `lokhu` | `this` |
| `entsha` | `new` |
| `susa` | `delete` |
| `isenzi` | `operator` |
| `isifanekiso` | `template` |
| `uhlobo` | `typename` |
| `umqondo` | `concept` |
| `kudinga` | `requires` |
| `indawo_yamagama` | `namespace` |
| `sebenzisa` | `using` |
| `igama_elisha` | `typedef` |
| `thumela_ngaphandle` | `export` |
| `ngenisa` | `import` |
| `imojula` | `module` |
| `umhlanganisi` | `asm` |

## Keywords: Casts and compile-time

| isiZulu | C++ |
|---|---|
| `guqula` | `static_cast` |
| `guqula_ngesikhathi` | `dynamic_cast` |
| `guqula_engaguquki` | `const_cast` |
| `guqula_ngamandla` | `reinterpret_cast` |
| `thola_uhlobo` | `typeid` |
| `usayizi` | `sizeof` |
| `ukuqondana` | `alignof` |
| `qinisekisa` | `static_assert` |

## Keywords: Constants

| isiZulu | C++ |
|---|---|
| `iqiniso` | `true` |
| `amanga` | `false` |
| `lutho` | `nullptr` |

## Keywords: Word operators

| isiZulu | C++ |
|---|---|
| `futhi` | `and` |
| `noma` | `or` |
| `hhayi` | `not` |
| `akulingani` | `not_eq` |
| `futhi_lingana` | `and_eq` |
| `noma_lingana` | `or_eq` |
| `noma_kuphela` | `xor` |
| `noma_kuphela_lingana` | `xor_eq` |
| `futhi_bhithi` | `bitand` |
| `noma_bhithi` | `bitor` |
| `phendula_bhithi` | `compl` |

## Preprocessor

| isiZulu | C++ |
|---|---|
| `#faka` | `#include` |
| `#chaza` | `#define` |
| `#sula` | `#undef` |
| `#uma` | `#if` |
| `#uma_kuchaziwe` | `#ifdef` |
| `#uma_kungachazwanga` | `#ifndef` |
| `#kungenjalo_uma` | `#elif` |
| `#kungenjalo_uma_kuchaziwe` | `#elifdef` |
| `#kungenjalo_uma_kungachazwanga` | `#elifndef` |
| `#kungenjalo` | `#else` |
| `#qeda_uma` | `#endif` |
| `#umugqa` | `#line` |
| `#iphutha` | `#error` |
| `#isexwayiso` | `#warning` |
| `#isiyalezo` | `#pragma` |

## Header files

| isiZulu | C++ |
|---|---|
| `<konke>` | `<bits/stdc++.h>` |
| `<okokufaka_nokukhipha>` | `<iostream>` |
| `<umbhalo>` | `<string>` |
| `<iqoqo>` | `<vector>` |
| `<imephu>` | `<map>` |
| `<imephu_engahleliwe>` | `<unordered_map>` |
| `<isethi>` | `<set>` |
| `<isethi_engahleliwe>` | `<unordered_set>` |
| `<ulayini>` | `<queue>` |
| `<inqwaba>` | `<stack>` |
| `<ulayini_kabili>` | `<deque>` |
| `<uhlu_oluxhunyiwe>` | `<list>` |
| `<uhide>` | `<array>` |
| `<amasu>` | `<algorithm>` |
| `<izibalo>` | `<cmath>` |
| `<umtapo_c>` | `<cstdlib>` |
| `<isikhathi>` | `<ctime>` |
| `<amafayela>` | `<fstream>` |
| `<umfudlana_wombhalo>` | `<sstream>` |
| `<ukuhlela_okuphumayo>` | `<iomanip>` |
| `<usizo>` | `<utility>` |
| `<inkumbulo>` | `<memory>` |
| `<imisebenzi>` | `<functional>` |
| `<izinombolo>` | `<numeric>` |
| `<imingcele>` | `<limits>` |
| `<imingcele_c>` | `<climits>` |
| `<izinombolo_ezinosayizi>` | `<cstdint>` |
| `<umbhalo_c>` | `<cstring>` |
| `<izinhlamvu>` | `<cctype>` |
| `<isikhathi_esinembile>` | `<chrono>` |
| `<umucu>` | `<thread>` |
| `<isivalo>` | `<mutex>` |
| `<okwehlukile>` | `<exception>` |
| `<amaphutha>` | `<stdexcept>` |
| `<isihambi>` | `<iterator>` |
| `<iqembu>` | `<tuple>` |
| `<okungakhethwa>` | `<optional>` |
| `<okungahleliwe>` | `<random>` |
| `<amabhithi>` | `<bitset>` |

## Library: Core

| isiZulu | C++ |
|---|---|
| `okuyinhloko` | `main` |
| `isisekelo` | `std` |
| `kuchaziwe` | `defined` |
| `phrinta` | `printf` |
| `skena` | `scanf` |

## Library: Input / output and files

| isiZulu | C++ |
|---|---|
| `bhala` | `std::cout` |
| `funda` | `std::cin` |
| `bhala_iphutha` | `std::cerr` |
| `bhala_umlando` | `std::clog` |
| `umugqa` | `std::endl` |
| `funda_umugqa` | `std::getline` |
| `geleza` | `std::flush` |
| `amadesimali_aqinile` | `std::fixed` |
| `setha_ukunemba` | `std::setprecision` |
| `setha_ububanzi` | `std::setw` |
| `ifayela_lokufunda` | `std::ifstream` |
| `ifayela_lokubhala` | `std::ofstream` |
| `ifayela` | `std::fstream` |
| `umfudlana_wombhalo` | `std::stringstream` |
| `umfudlana_wokufunda` | `std::istringstream` |
| `umfudlana_wokubhala` | `std::ostringstream` |

## Library: Data types

| isiZulu | C++ |
|---|---|
| `inombolo_kasayizi` | `std::size_t` |
| `inombolo8` | `std::int8_t` |
| `inombolo16` | `std::int16_t` |
| `inombolo32` | `std::int32_t` |
| `inombolo64` | `std::int64_t` |
| `ongenaphawu8` | `std::uint8_t` |
| `ongenaphawu16` | `std::uint16_t` |
| `ongenaphawu32` | `std::uint32_t` |
| `ongenaphawu64` | `std::uint64_t` |

## Library: Containers (STL)

| isiZulu | C++ |
|---|---|
| `umbhalo` | `std::string` |
| `iqoqo` | `std::vector` |
| `imephu` | `std::map` |
| `imephu_engahleliwe` | `std::unordered_map` |
| `imephu_eningi` | `std::multimap` |
| `isethi` | `std::set` |
| `isethi_engahleliwe` | `std::unordered_set` |
| `isethi_eningi` | `std::multiset` |
| `ulayini` | `std::queue` |
| `ulayini_obalulekile` | `std::priority_queue` |
| `inqwaba` | `std::stack` |
| `ulayini_kabili` | `std::deque` |
| `uhlu_oluxhunyiwe` | `std::list` |
| `uhide` | `std::array` |
| `ipheya` | `std::pair` |
| `iqembu` | `std::tuple` |
| `amabhithi` | `std::bitset` |
| `okungakhethwa` | `std::optional` |
| `yenza_ipheya` | `std::make_pair` |
| `yenza_iqembu` | `std::make_tuple` |
| `thatha` | `std::get` |
| `bopha` | `std::tie` |
| `hambisa` | `std::move` |

## Library: Smart pointers

| isiZulu | C++ |
|---|---|
| `isikhombi_esisodwa` | `std::unique_ptr` |
| `isikhombi_esabelwana` | `std::shared_ptr` |
| `isikhombi_esibuthaka` | `std::weak_ptr` |
| `yenza_esisodwa` | `std::make_unique` |
| `yenza_esabelwana` | `std::make_shared` |

## Library: Algorithms

| isiZulu | C++ |
|---|---|
| `hlela` | `std::sort` |
| `hlehlisa` | `std::reverse` |
| `thola` | `std::find` |
| `bala` | `std::count` |
| `okukhulu` | `std::max` |
| `okuncane` | `std::min` |
| `into_enkulu` | `std::max_element` |
| `into_encane` | `std::min_element` |
| `qoqa_isamba` | `std::accumulate` |
| `sesha_kabili` | `std::binary_search` |
| `umngcele_ophansi` | `std::lower_bound` |
| `umngcele_ophezulu` | `std::upper_bound` |
| `gcwalisa` | `std::fill` |
| `kopisha` | `std::copy` |
| `guqula_konke` | `std::transform` |
| `kuyinye_ngayinye` | `std::for_each` |
| `susa_okuphindiwe` | `std::unique` |
| `ukuhlelwa_okulandelayo` | `std::next_permutation` |
| `shintshanisa` | `std::swap` |
| `landelanisa` | `std::iota` |

## Library: Math

| isiZulu | C++ |
|---|---|
| `inani_eliphelele` | `std::abs` |
| `impande` | `std::sqrt` |
| `amandla` | `std::pow` |
| `nyusa` | `std::ceil` |
| `ehlisa` | `std::floor` |
| `sondeza` | `std::round` |
| `isayini` | `std::sin` |
| `ikhosayini` | `std::cos` |
| `ithenjenti` | `std::tan` |
| `ilogi` | `std::log` |
| `ilogi10` | `std::log10` |
| `ieksponenti` | `std::exp` |
| `ihayiphothenuse` | `std::hypot` |
| `insalela` | `std::fmod` |
| `isehlukanisi_esikhulu` | `std::gcd` |
| `iphindaphindwe_elincane` | `std::lcm` |
| `imingcele_yezinombolo` | `std::numeric_limits` |
| `okungahleliwe` | `std::rand` |
| `hlwanyela_okungahleliwe` | `std::srand` |
| `isikhathi` | `std::time` |

## Library: Strings and characters

| isiZulu | C++ |
|---|---|
| `kumbhalo` | `std::to_string` |
| `kunombolo` | `std::stoi` |
| `kunombolo_ende` | `std::stol` |
| `kudesimali` | `std::stod` |
| `kokukhulu` | `std::toupper` |
| `kokuncane` | `std::tolower` |
| `uyidijithi` | `std::isdigit` |
| `uyinhlamvu` | `std::isalpha` |
| `uyisikhala` | `std::isspace` |
| `ungokukhulu` | `std::isupper` |
| `ungokuncane` | `std::islower` |

## Library: Exceptions

| isiZulu | C++ |
|---|---|
| `okwehlukile` | `std::exception` |
| `iphutha_lokusebenza` | `std::runtime_error` |
| `iphutha_lokucabanga` | `std::logic_error` |
| `ngaphandle_kobubanzi` | `std::out_of_range` |
| `impikiswano_engalungile` | `std::invalid_argument` |

## Library: Threads

| isiZulu | C++ |
|---|---|
| `umucu` | `std::thread` |
| `isivalo` | `std::mutex` |
| `umqaphi_wesivalo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| isiZulu | C++ |
|---|---|
| `ubukhulu` | `size` |
| `ubude` | `length` |
| `kungenalutho` | `empty` |
| `engeza_ekugcineni` | `push_back` |
| `susa_ekugcineni` | `pop_back` |
| `engeza_ekuqaleni` | `push_front` |
| `susa_ekuqaleni` | `pop_front` |
| `beka` | `emplace` |
| `beka_ekugcineni` | `emplace_back` |
| `engeza` | `push` |
| `khipha` | `pop` |
| `okuphezulu` | `top` |
| `phambili` | `front` |
| `emuva` | `back` |
| `ukuqala` | `begin` |
| `ukuphela` | `end` |
| `ukuqala_emuva` | `rbegin` |
| `ukuphela_emuva` | `rend` |
| `sula_konke` | `clear` |
| `faka_phakathi` | `insert` |
| `cisha` | `erase` |
| `endaweni` | `at` |
| `ingxenye` | `substr` |
| `namathisela` | `append` |
| `umbhalo_c` | `c_str` |
| `qhathanisa` | `compare` |
| `faka_esikhundleni` | `replace` |
| `shintsha_ubukhulu` | `resize` |
| `gcina_indawo` | `reserve` |
| `umthamo` | `capacity` |
| `okokuqala` | `first` |
| `okwesibili` | `second` |
| `kwenzenjani` | `what` |
| `vula` | `open` |
| `vala` | `close` |
| `kuvulekile` | `is_open` |
| `ukuphela_kwefayela` | `eof` |
| `umbhalo_wonke` | `str` |
| `setha_kabusha` | `reset` |
| `khulula` | `release` |
| `joyina` | `join` |
| `hlukanisa` | `detach` |
| `khiya` | `lock` |
| `vula_ukhiye` | `unlock` |

## Library: Arduino / robots

| isiZulu | C++ |
|---|---|
| `qala` | `setup` |
| `phindaphinda` | `loop` |
| `setha_iphini` | `pinMode` |
| `bhala_idijithali` | `digitalWrite` |
| `funda_idijithali` | `digitalRead` |
| `funda_ianalogi` | `analogRead` |
| `bhala_ianalogi` | `analogWrite` |
| `linda` | `delay` |
| `linda_amamayikhro` | `delayMicroseconds` |
| `amamilisekhondi` | `millis` |
| `amamayikhrosekhondi` | `micros` |
| `vimbela` | `constrain` |
| `ithoni` | `tone` |
| `misa_ithoni` | `noTone` |
| `namathisela_ukuphazamiseka` | `attachInterrupt` |
| `PHEZULU` | `HIGH` |
| `PHANSI` | `LOW` |
| `OKUPHUMAYO` | `OUTPUT` |
| `OKUNGENAYO` | `INPUT` |
| `OKUNGENAYO_KUDONSELWE` | `INPUT_PULLUP` |
| `ILED_EYAKHIWE` | `LED_BUILTIN` |
| `Isiriyeli` | `Serial` |
| `bonisa` | `print` |
| `bonisa_umugqa` | `println` |
| `kutholakalayo` | `available` |
| `funda_ibhayithi` | `read` |
| `bhala_ibhayithi` | `write` |

# Library packs

A pack switches on when you include one of its headers (in your language or in English).

## Arduino libraries

Headers: `#faka <iservo>` = `<Servo.h>`, `#faka <ucingo>` = `<Wire.h>`, `#faka <ibhasi_spi>` = `<SPI.h>`, `#faka <inkumbulo_ehlalayo>` = `<EEPROM.h>`

| isiZulu | C++ |
|---|---|
| `Iservo` | `Servo` |
| `xhuma` | `attach` |
| `bhala_amamayikhrosekhondi` | `writeMicroseconds` |
| `Ucingo` | `Wire` |
| `qala_ukuthumela` | `beginTransmission` |
| `qeda_ukuthumela` | `endTransmission` |
| `cela_ku` | `requestFrom` |
| `uma_kutholwa` | `onReceive` |
| `uma_kucelwa` | `onRequest` |
| `Ibhasi_spi` | `SPI` |
| `dlulisa` | `transfer` |
| `Inkumbulo_ehlalayo` | `EEPROM` |
| `faka_kuyo` | `put` |
| `buyekeza` | `update` |

## Arduino (always on)

| isiZulu | C++ |
|---|---|
| `khetha_ngokungahleliwe` | `random` |
| `imbewu_yokungahleliwe` | `randomSeed` |
| `linganisa_kabusha` | `map` |
| `linganisa_ipulse` | `pulseIn` |
| `iphini_kuya_ekuphazamisekeni` | `digitalPinToInterrupt` |
| `KUYENYUKA` | `RISING` |
| `KUYEHLA` | `FALLING` |
| `UMA_KUSHINTSHA` | `CHANGE` |
| `vumela_ukuphazamiseka` | `interrupts` |
| `vimba_ukuphazamiseka` | `noInterrupts` |
| `funda_inombolo` | `parseInt` |
| `funda_idesimali` | `parseFloat` |
| `funda_umbhalo` | `readString` |
| `funda_umbhalo_kuze` | `readStringUntil` |
| `kube_inombolo` | `toInt` |
| `kube_idesimali` | `toFloat` |
| `indawo_ka` | `indexOf` |
| `ingxenye_yombhalo` | `substring` |
| `sika_izikhala` | `trim` |
| `kube_okukhulu` | `toUpperCase` |
| `kube_okuncane` | `toLowerCase` |
| `iqala_ngo` | `startsWith` |
| `iphela_ngo` | `endsWith` |

## CUDA

Headers: `#faka <igpu>` = `<cuda_runtime.h>`

| isiZulu | C++ |
|---|---|
| `umsebenzi_wegpu` | `__global__` |
| `okwegpu` | `__device__` |
| `okwekhompyutha` | `__host__` |
| `okwabelwana_gpu` | `__shared__` |
| `vumelanisa_imicu` | `__syncthreads` |
| `inombolo_yomucu` | `threadIdx` |
| `inombolo_yebhulokhi` | `blockIdx` |
| `ubukhulu_bebhulokhi` | `blockDim` |
| `ubukhulu_begridi` | `gridDim` |
| `ubukhulu3` | `dim3` |
| `gpu_beka_inkumbulo` | `cudaMalloc` |
| `gpu_khulula_inkumbulo` | `cudaFree` |
| `gpu_kopisha_inkumbulo` | `cudaMemcpy` |
| `KUSUKA_KHOMPYUTHA_KUYA_GPU` | `cudaMemcpyHostToDevice` |
| `KUSUKA_GPU_KUYA_KHOMPYUTHA` | `cudaMemcpyDeviceToHost` |
| `gpu_linda_iqede` | `cudaDeviceSynchronize` |
| `gpu_iphutha_lokugcina` | `cudaGetLastError` |
| `gpu_umbhalo_wephutha` | `cudaGetErrorString` |
| `Iphutha_legpu` | `cudaError_t` |
| `GPU_KUPHUMELELE` | `cudaSuccess` |

## Eigen

Headers: `#faka <amamatriki>` = `<Eigen/Dense>`, `#faka <amamatriki_isisekelo>` = `<Eigen/Core>`, `#faka <ijiyomethri>` = `<Eigen/Geometry>`

| isiZulu | C++ |
|---|---|
| `amamatriki` | `Eigen` |
| `Imatriki` | `Eigen::MatrixXd` |
| `Ivektha` | `Eigen::VectorXd` |
| `Imatriki3` | `Eigen::Matrix3d` |
| `Imatriki4` | `Eigen::Matrix4d` |
| `Ivektha3` | `Eigen::Vector3d` |
| `Imatriki_yohlobo` | `Eigen::Matrix` |
| `Ikhwatheniyoni` | `Eigen::Quaterniond` |
| `Ingile_ne_eksisi` | `Eigen::AngleAxisd` |
| `Ubunye` | `Identity` |
| `Uziro` | `Zero` |
| `Konke_kunye` | `Ones` |
| `Ngokungahleliwe` | `Random` |
| `phendula_imatriki` | `transpose` |
| `okuphambene` | `inverse` |
| `isinqumo` | `determinant` |
| `ubude_bevektha` | `norm` |
| `ilinganiswe` | `normalized` |
| `umphumela_wechashazi` | `dot` |
| `umkhiqizo_wesiphambano` | `cross` |
| `xazulula` | `solve` |
| `hlukanisa_qr` | `colPivHouseholderQr` |
| `cishe_kuyalingana` | `isApprox` |
| `Eksisi_X` | `UnitX` |
| `Eksisi_Y` | `UnitY` |
| `Eksisi_Z` | `UnitZ` |
| `ibe_imatriki` | `matrix` |

## OpenCV

Headers: `#faka <umbono>` = `<opencv2/opencv.hpp>`, `#faka <umbono_isisekelo>` = `<opencv2/core.hpp>`, `#faka <umbono_izithombe>` = `<opencv2/imgproc.hpp>`, `#faka <umbono_amawindi>` = `<opencv2/highgui.hpp>`, `#faka <umbono_ividiyo>` = `<opencv2/videoio.hpp>`, `#faka <umbono_ukuthola_izinto>` = `<opencv2/objdetect.hpp>`

| isiZulu | C++ |
|---|---|
| `umbono` | `cv` |
| `Isithombe` | `cv::Mat` |
| `funda_isithombe` | `cv::imread` |
| `londoloza_isithombe` | `cv::imwrite` |
| `bonisa_isithombe` | `cv::imshow` |
| `linda_inkinobho` | `cv::waitKey` |
| `dala_iwindi` | `cv::namedWindow` |
| `vala_amawindi_onke` | `cv::destroyAllWindows` |
| `guqula_umbala` | `cv::cvtColor` |
| `UMBALA_KUYA_KOMPUNGA` | `cv::COLOR_BGR2GRAY` |
| `UMBALA_KUYA_KU_HSV` | `cv::COLOR_BGR2HSV` |
| `UMBALA_KUYA_KU_RGB` | `cv::COLOR_BGR2RGB` |
| `fiphalisa` | `cv::GaussianBlur` |
| `thola_imiphetho` | `cv::Canny` |
| `umkhawulo` | `cv::threshold` |
| `UMKHAWULO_OMBILI` | `cv::THRESH_BINARY` |
| `shintsha_usayizi_wesithombe` | `cv::resize` |
| `dweba_unxande` | `cv::rectangle` |
| `dweba_indilinga` | `cv::circle` |
| `dweba_umugqa` | `cv::line` |
| `bhala_esithombeni` | `cv::putText` |
| `Iphoyinti` | `cv::Point` |
| `Ububanzi_nobude` | `cv::Size` |
| `Inani_lombala` | `cv::Scalar` |
| `Isifunda` | `cv::Rect` |
| `Ikhamera` | `cv::VideoCapture` |
| `ivuliwe` | `isOpened` |
| `imigqa` | `rows` |
| `amakholamu` | `cols` |
| `iziteshi` | `channels` |
| `yenza_ikhophi` | `clone` |
| `kopishela_ku` | `copyTo` |
| `thola_izinhlaka` | `cv::findContours` |
| `dweba_izinhlaka` | `cv::drawContours` |
| `indawo_yohlaka` | `cv::contourArea` |
| `ngaphakathi_kobubanzi` | `cv::inRange` |
| `Umhlukanisi` | `cv::CascadeClassifier` |
| `thola_izinto` | `detectMultiScale` |
| `layisha` | `load` |
| `FUNDA_NGOMBALA` | `cv::IMREAD_COLOR` |
| `FUNDA_NGOMPUNGA` | `cv::IMREAD_GRAYSCALE` |
| `IFONTI_ELULA` | `cv::FONT_HERSHEY_SIMPLEX` |
| `Iphikseli` | `cv::Vec3b` |
| `kugcwele_ngo0` | `zeros` |
| `kugcwele_ngo1` | `ones` |
| `IZINHLAKA_ZANGAPHANDLE` | `cv::RETR_EXTERNAL` |
| `IZINHLAKA_EZILULA` | `cv::CHAIN_APPROX_SIMPLE` |
| `ibhokisi_elizungezile` | `cv::boundingRect` |
| `UMBALA_8BIT_3` | `CV_8UC3` |
| `ububanzi` | `width` |
| `ukuphakama` | `height` |

## ROS 2

Headers: `#faka <ros2>` = `<rclcpp/rclcpp.hpp>`, `#faka <umlayezo_wombhalo>` = `<std_msgs/msg/string.hpp>`, `#faka <umlayezo_wenombolo>` = `<std_msgs/msg/int32.hpp>`, `#faka <umlayezo_wedesimali>` = `<std_msgs/msg/float64.hpp>`, `#faka <umlayezo_webhuli>` = `<std_msgs/msg/bool.hpp>`, `#faka <umyalo_wejubane>` = `<geometry_msgs/msg/twist.hpp>`, `#faka <ukuskena_kwelaser>` = `<sensor_msgs/msg/laser_scan.hpp>`, `#faka <isithombe_senzwa>` = `<sensor_msgs/msg/image.hpp>`

| isiZulu | C++ |
|---|---|
| `ros` | `rclcpp` |
| `qalisa_ros` | `rclcpp::init` |
| `vala_ros` | `rclcpp::shutdown` |
| `gijima_ros` | `rclcpp::spin` |
| `gijima_ros_kancane` | `rclcpp::spin_some` |
| `ros_isaphila` | `rclcpp::ok` |
| `Ifindo` | `rclcpp::Node` |
| `Umsakazi` | `rclcpp::Publisher` |
| `Ukubhalisa` | `rclcpp::Subscription` |
| `Isibali_sikhathi` | `rclcpp::TimerBase` |
| `dala_umsakazi` | `create_publisher` |
| `dala_ukubhalisa` | `create_subscription` |
| `dala_isibali_sikhathi` | `create_wall_timer` |
| `sakaza` | `publish` |
| `umbhali_womlando` | `get_logger` |
| `ROS_ULWAZI` | `RCLCPP_INFO` |
| `ROS_ISEXWAYISO` | `RCLCPP_WARN` |
| `ROS_IPHUTHA` | `RCLCPP_ERROR` |
| `Isikhombi` | `SharedPtr` |
| `idatha` | `data` |
| `oqondile` | `linear` |
| `ukujikeleza` | `angular` |
| `amabanga` | `ranges` |
| `memezela_ipharamitha` | `declare_parameter` |
| `thola_ipharamitha` | `get_parameter` |
| `umlayezo_wombhalo` | `std_msgs::msg::String` |
| `umlayezo_wenombolo` | `std_msgs::msg::Int32` |
| `umlayezo_wedesimali` | `std_msgs::msg::Float64` |
| `umlayezo_webhuli` | `std_msgs::msg::Bool` |
| `umyalo_wejubane` | `geometry_msgs::msg::Twist` |
| `ukuskena_kwelaser` | `sensor_msgs::msg::LaserScan` |
| `isithombe_senzwa` | `sensor_msgs::msg::Image` |

## Standard library extras (always on)

| isiZulu | C++ |
|---|---|
| `idatha` | `data` |

## PyTorch (libtorch)

Headers: `#faka <ukufunda_komshini>` = `<torch/torch.h>`

| isiZulu | C++ |
|---|---|
| `ukufunda_komshini` | `torch` |
| `Ithensa` | `torch::Tensor` |
| `yenza_ithensa` | `torch::tensor` |
| `kugcwele_ngo0` | `torch::zeros` |
| `kugcwele_ngo1` | `torch::ones` |
| `ithensa_engahleliwe` | `torch::rand` |
| `ithensa_engahleliwe_ejwayelekile` | `torch::randn` |
| `setha_imbewu` | `torch::manual_seed` |
| `Ingxenye_yenethiwekhi` | `torch::nn::Module` |
| `Ungqimba_oluqondile` | `torch::nn::Linear` |
| `Ungqimba_lokuhlanganisa2d` | `torch::nn::Conv2d` |
| `isivuseleli_relu` | `torch::relu` |
| `ilogi_yamathuba` | `torch::log_softmax` |
| `ukulahlekelwa_kwesikwele` | `torch::mse_loss` |
| `ukulahlekelwa_kwamathuba` | `torch::nll_loss` |
| `Isithuthukisi_SGD` | `torch::optim::SGD` |
| `Isithuthukisi_Adam` | `torch::optim::Adam` |
| `Idivayisi` | `torch::Device` |
| `KU_GPU` | `torch::kCUDA` |
| `KU_CPU` | `torch::kCPU` |
| `igpu_ikhona` | `torch::cuda::is_available` |
| `londoloza_imodeli` | `torch::save` |
| `layisha_imodeli` | `torch::load` |
| `Umqaphi_ongafundi` | `torch::NoGradGuard` |
| `bhalisa_ingxenye` | `register_module` |
| `dlulisela_phambili` | `forward` |
| `buyela_emuva` | `backward` |
| `sula_ukuthambekela` | `zero_grad` |
| `thatha_isinyathelo` | `step` |
| `yisa_ku` | `to` |
| `inani_elilodwa` | `item` |
| `bheka_njenge` | `view` |
| `shintsha_isimo` | `reshape` |
| `phindaphinda_amamatriki` | `matmul` |
| `isamba_sethensa` | `sum` |
| `isilinganiso_sethensa` | `mean` |
| `inkomba_enkulu` | `argmax` |
| `amapharamitha` | `parameters` |
| `qeqesha` | `train` |
| `hlola_imodeli` | `eval` |
