# Soga: isiXhosa reference

> draft - needs review by isiXhosa speakers

Every word below can be used in `.xh.soga` files. Plain English C++ keeps working too.

## Keywords: Control flow

| isiXhosa | C++ |
|---|---|
| `ukuba` | `if` |
| `kungenjalo` | `else` |
| `khetha` | `switch` |
| `imeko` | `case` |
| `okuqhelekileyo` | `default` |
| `ngelixa` | `while` |
| `yenza` | `do` |
| `jikeleza` | `for` |
| `phuma` | `break` |
| `qhubeka` | `continue` |
| `buyisa` | `return` |
| `tsiba` | `goto` |
| `zama` | `try` |
| `bamba` | `catch` |
| `phosa` | `throw` |
| `co_linda` | `co_await` |
| `co_buyisa` | `co_return` |
| `co_velisa` | `co_yield` |

## Keywords: Data types

| isiXhosa | C++ |
|---|---|
| `inani` | `int` |
| `idesimali` | `float` |
| `idesimali_ephindiweyo` | `double` |
| `unobumba` | `char` |
| `unobumba8` | `char8_t` |
| `unobumba16` | `char16_t` |
| `unobumba32` | `char32_t` |
| `unobumba_obanzi` | `wchar_t` |
| `ibhuli` | `bool` |
| `ize` | `void` |
| `emfutshane` | `short` |
| `ende` | `long` |
| `enophawu` | `signed` |
| `engenaphawu` | `unsigned` |
| `ngokuzenzekelayo` | `auto` |
| `uhlobo_lwe` | `decltype` |

## Keywords: Modifiers

| isiXhosa | C++ |
|---|---|
| `engatshintshiyo` | `const` |
| `kwangaphambili` | `constexpr` |
| `vavanya_kwangaphambili` | `consteval` |
| `qalisa_kwangaphambili` | `constinit` |
| `emileyo` | `static` |
| `yangaphandle` | `extern` |
| `eguquguqukayo` | `volatile` |
| `etshintshayo` | `mutable` |
| `ngaphakathi` | `inline` |
| `irejista` | `register` |
| `yomsonto` | `thread_local` |
| `ngokucacileyo` | `explicit` |
| `ngaphandle_kwempazamo` | `noexcept` |
| `lungelelanisa` | `alignas` |

## Keywords: Classes, objects and structure

| isiXhosa | C++ |
|---|---|
| `iklasi` | `class` |
| `isakhiwo` | `struct` |
| `umanyano` | `union` |
| `uluhlu` | `enum` |
| `yoluntu` | `public` |
| `yabucala` | `private` |
| `ekhuselweyo` | `protected` |
| `ebonakalayo` | `virtual` |
| `endaweni` | `override` |
| `yokugqibela` | `final` |
| `umhlobo` | `friend` |
| `oku` | `this` |
| `entsha` | `new` |
| `cima` | `delete` |
| `isenzi` | `operator` |
| `umzekelo` | `template` |
| `uhlobo` | `typename` |
| `ingcinga` | `concept` |
| `ifuna` | `requires` |
| `indawo_yamagama` | `namespace` |
| `sebenzisa` | `using` |
| `igama_elitsha` | `typedef` |
| `thumela` | `export` |
| `ngenisa` | `import` |
| `imodyuli` | `module` |
| `umhlanganisi` | `asm` |

## Keywords: Casts and compile-time

| isiXhosa | C++ |
|---|---|
| `guqula` | `static_cast` |
| `guqula_ngexesha` | `dynamic_cast` |
| `guqula_engatshintshiyo` | `const_cast` |
| `guqula_ngamandla` | `reinterpret_cast` |
| `fumana_uhlobo` | `typeid` |
| `ubungakanani_be` | `sizeof` |
| `ulungelelwaniso` | `alignof` |
| `qinisekisa` | `static_assert` |

## Keywords: Constants

| isiXhosa | C++ |
|---|---|
| `inyani` | `true` |
| `ubuxoki` | `false` |
| `akukho` | `nullptr` |

## Keywords: Word operators

| isiXhosa | C++ |
|---|---|
| `kwaye` | `and` |
| `okanye` | `or` |
| `hayi` | `not` |
| `akulingani` | `not_eq` |
| `kwaye_lingana` | `and_eq` |
| `okanye_lingana` | `or_eq` |
| `okanye_kuphela` | `xor` |
| `okanye_kuphela_lingana` | `xor_eq` |
| `kwaye_bhithi` | `bitand` |
| `okanye_bhithi` | `bitor` |
| `jika_bhithi` | `compl` |

## Preprocessor

| isiXhosa | C++ |
|---|---|
| `#faka` | `#include` |
| `#chaza` | `#define` |
| `#cima_inkcazo` | `#undef` |
| `#ukuba` | `#if` |
| `#ukuba_kuchaziwe` | `#ifdef` |
| `#ukuba_akuchazwanga` | `#ifndef` |
| `#kungenjalo_ukuba` | `#elif` |
| `#kungenjalo_ukuba_kuchaziwe` | `#elifdef` |
| `#kungenjalo_ukuba_akuchazwanga` | `#elifndef` |
| `#kungenjalo` | `#else` |
| `#phela_ukuba` | `#endif` |
| `#umgca` | `#line` |
| `#impazamo` | `#error` |
| `#isilumkiso` | `#warning` |
| `#umyalelo` | `#pragma` |

## Header files

| isiXhosa | C++ |
|---|---|
| `<konke>` | `<bits/stdc++.h>` |
| `<ngeniso_nokuphuma>` | `<iostream>` |
| `<umbhalo>` | `<string>` |
| `<uludwe>` | `<vector>` |
| `<imephu>` | `<map>` |
| `<imephu_engalungiswanga>` | `<unordered_map>` |
| `<iseti>` | `<set>` |
| `<iseti_engalungiswanga>` | `<unordered_set>` |
| `<umgca_wokulinda>` | `<queue>` |
| `<imfumba>` | `<stack>` |
| `<umgca_ophindiweyo>` | `<deque>` |
| `<uluhlu_oludityanisiweyo>` | `<list>` |
| `<uthotho>` | `<array>` |
| `<amaqhinga>` | `<algorithm>` |
| `<izibalo>` | `<cmath>` |
| `<ilayibrari_c>` | `<cstdlib>` |
| `<ixesha>` | `<ctime>` |
| `<iifayile>` | `<fstream>` |
| `<umsinga_wombhalo>` | `<sstream>` |
| `<ulungiselelo_lokuphuma>` | `<iomanip>` |
| `<uncedo>` | `<utility>` |
| `<inkumbulo>` | `<memory>` |
| `<imisebenzi>` | `<functional>` |
| `<amanani>` | `<numeric>` |
| `<imida>` | `<limits>` |
| `<imida_c>` | `<climits>` |
| `<amanani_anobungakanani>` | `<cstdint>` |
| `<umbhalo_c>` | `<cstring>` |
| `<oonobumba>` | `<cctype>` |
| `<ixesha_elichanekileyo>` | `<chrono>` |
| `<umsonto>` | `<thread>` |
| `<isitshixo>` | `<mutex>` |
| `<okungaqhelekanga>` | `<exception>` |
| `<iimpazamo>` | `<stdexcept>` |
| `<isihambi>` | `<iterator>` |
| `<iqela>` | `<tuple>` |
| `<okukhethwayo>` | `<optional>` |
| `<ngokungacwangciswanga>` | `<random>` |
| `<iibhithi>` | `<bitset>` |

## Library: Core

| isiXhosa | C++ |
|---|---|
| `engundoqo` | `main` |
| `isiseko` | `std` |
| `kuchaziwe` | `defined` |
| `printa` | `printf` |
| `skena` | `scanf` |

## Library: Input / output and files

| isiXhosa | C++ |
|---|---|
| `bhala` | `std::cout` |
| `funda` | `std::cin` |
| `bhala_impazamo` | `std::cerr` |
| `bhala_ingxelo` | `std::clog` |
| `umgca_omtsha` | `std::endl` |
| `funda_umgca` | `std::getline` |
| `cocisa` | `std::flush` |
| `iidesimali_ezizinzileyo` | `std::fixed` |
| `misela_ukuchaneka` | `std::setprecision` |
| `misela_ububanzi` | `std::setw` |
| `ifayile_yokufunda` | `std::ifstream` |
| `ifayile_yokubhala` | `std::ofstream` |
| `ifayile` | `std::fstream` |
| `umsinga_wombhalo` | `std::stringstream` |
| `umsinga_wokufunda` | `std::istringstream` |
| `umsinga_wokubhala` | `std::ostringstream` |

## Library: Data types

| isiXhosa | C++ |
|---|---|
| `inani_lobungakanani` | `std::size_t` |
| `inani8` | `std::int8_t` |
| `inani16` | `std::int16_t` |
| `inani32` | `std::int32_t` |
| `inani64` | `std::int64_t` |
| `engenaphawu8` | `std::uint8_t` |
| `engenaphawu16` | `std::uint16_t` |
| `engenaphawu32` | `std::uint32_t` |
| `engenaphawu64` | `std::uint64_t` |

## Library: Containers (STL)

| isiXhosa | C++ |
|---|---|
| `umbhalo` | `std::string` |
| `uludwe` | `std::vector` |
| `imephu` | `std::map` |
| `imephu_engalungiswanga` | `std::unordered_map` |
| `imephu_eninzi` | `std::multimap` |
| `iseti` | `std::set` |
| `iseti_engalungiswanga` | `std::unordered_set` |
| `iseti_eninzi` | `std::multiset` |
| `umgca_wokulinda` | `std::queue` |
| `umgca_obalulekileyo` | `std::priority_queue` |
| `imfumba` | `std::stack` |
| `umgca_ophindiweyo` | `std::deque` |
| `uluhlu_oludityanisiweyo` | `std::list` |
| `uthotho` | `std::array` |
| `isibini` | `std::pair` |
| `iqela` | `std::tuple` |
| `iibhithi` | `std::bitset` |
| `okukhethwayo` | `std::optional` |
| `yenza_isibini` | `std::make_pair` |
| `yenza_iqela` | `std::make_tuple` |
| `thatha` | `std::get` |
| `bopha` | `std::tie` |
| `shenxisa` | `std::move` |

## Library: Smart pointers

| isiXhosa | C++ |
|---|---|
| `isalathisi_esinye` | `std::unique_ptr` |
| `isalathisi_esabelwanayo` | `std::shared_ptr` |
| `isalathisi_esibuthathaka` | `std::weak_ptr` |
| `yenza_esinye` | `std::make_unique` |
| `yenza_esabelwanayo` | `std::make_shared` |

## Library: Algorithms

| isiXhosa | C++ |
|---|---|
| `cwangcisa` | `std::sort` |
| `buyisela_umva` | `std::reverse` |
| `fumana` | `std::find` |
| `bala` | `std::count` |
| `esona_sikhulu` | `std::max` |
| `esona_sincinci` | `std::min` |
| `into_enkulu` | `std::max_element` |
| `into_encinci` | `std::min_element` |
| `qokelela_isixa` | `std::accumulate` |
| `khangela_kabini` | `std::binary_search` |
| `umda_ongezantsi` | `std::lower_bound` |
| `umda_ongaphezulu` | `std::upper_bound` |
| `zalisa` | `std::fill` |
| `kopa` | `std::copy` |
| `guqula_konke` | `std::transform` |
| `nganye_nganye` | `std::for_each` |
| `susa_eziphindiweyo` | `std::unique` |
| `ulandelelwano_olulandelayo` | `std::next_permutation` |
| `tshintshanisa` | `std::swap` |
| `landelelanisa` | `std::iota` |

## Library: Math

| isiXhosa | C++ |
|---|---|
| `ixabiso_elipheleleyo` | `std::abs` |
| `ingcambu` | `std::sqrt` |
| `amandla` | `std::pow` |
| `nyusela` | `std::ceil` |
| `hlisela` | `std::floor` |
| `sondeza` | `std::round` |
| `isayini` | `std::sin` |
| `ikhosayini` | `std::cos` |
| `ithenjenti` | `std::tan` |
| `ilogi` | `std::log` |
| `ilogi10` | `std::log10` |
| `iekhsponenti` | `std::exp` |
| `ihayiphothenyusi` | `std::hypot` |
| `intsalela` | `std::fmod` |
| `isahluli_esikhulu` | `std::gcd` |
| `iphindaphindo_elincinci` | `std::lcm` |
| `imida_yamanani` | `std::numeric_limits` |
| `ngokungacwangciswanga` | `std::rand` |
| `hlwayela_ngokungacwangciswanga` | `std::srand` |
| `ixesha` | `std::time` |

## Library: Strings and characters

| isiXhosa | C++ |
|---|---|
| `ukuya_kumbhalo` | `std::to_string` |
| `ukuya_kwinani` | `std::stoi` |
| `ukuya_kwinani_elide` | `std::stol` |
| `ukuya_kwidesimali` | `std::stod` |
| `ukuya_konobumba_omkhulu` | `std::toupper` |
| `ukuya_konobumba_omncinci` | `std::tolower` |
| `lidijithi` | `std::isdigit` |
| `ngunobumba` | `std::isalpha` |
| `sisithuba` | `std::isspace` |
| `ngumkhulu` | `std::isupper` |
| `ngumncinci` | `std::islower` |

## Library: Exceptions

| isiXhosa | C++ |
|---|---|
| `okungaqhelekanga` | `std::exception` |
| `impazamo_yokusebenza` | `std::runtime_error` |
| `impazamo_yengqiqo` | `std::logic_error` |
| `ngaphandle_komda` | `std::out_of_range` |
| `ingxoxo_engalunganga` | `std::invalid_argument` |

## Library: Threads

| isiXhosa | C++ |
|---|---|
| `umsonto` | `std::thread` |
| `isitshixo` | `std::mutex` |
| `umgcini_wesitshixo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| isiXhosa | C++ |
|---|---|
| `ubungakanani` | `size` |
| `ubude` | `length` |
| `akukho_nto` | `empty` |
| `yongeza_ekugqibeleni` | `push_back` |
| `susa_ekugqibeleni` | `pop_back` |
| `yongeza_ekuqaleni` | `push_front` |
| `susa_ekuqaleni` | `pop_front` |
| `beka` | `emplace` |
| `beka_ekugqibeleni` | `emplace_back` |
| `yongeza` | `push` |
| `khupha` | `pop` |
| `ephezulu` | `top` |
| `phambili` | `front` |
| `ngasemva` | `back` |
| `ukuqala` | `begin` |
| `ukuphela` | `end` |
| `ukuqala_ngasemva` | `rbegin` |
| `ukuphela_ngasemva` | `rend` |
| `cima_konke` | `clear` |
| `faka_phakathi` | `insert` |
| `khupha_into` | `erase` |
| `kwindawo` | `at` |
| `inxenye` | `substr` |
| `ncamathisela` | `append` |
| `umbhalo_c` | `c_str` |
| `thelekisa` | `compare` |
| `buyisela_endaweni` | `replace` |
| `tshintsha_ubungakanani` | `resize` |
| `gcina_indawo` | `reserve` |
| `umthamo` | `capacity` |
| `eyokuqala` | `first` |
| `eyesibini` | `second` |
| `kwenzeke_ntoni` | `what` |
| `vula` | `open` |
| `vala` | `close` |
| `ivulekile` | `is_open` |
| `isiphelo_sefayile` | `eof` |
| `umbhalo_wonke` | `str` |
| `misela_kwakhona` | `reset` |
| `khulula` | `release` |
| `dibana` | `join` |
| `ahlula` | `detach` |
| `tshixa` | `lock` |
| `vula_isitshixo` | `unlock` |

## Library: Arduino / robots

| isiXhosa | C++ |
|---|---|
| `qalisa` | `setup` |
| `phinda_phinda` | `loop` |
| `misela_iphini` | `pinMode` |
| `bhala_idijithali` | `digitalWrite` |
| `funda_idijithali` | `digitalRead` |
| `funda_ianalogu` | `analogRead` |
| `bhala_ianalogu` | `analogWrite` |
| `linda` | `delay` |
| `linda_iimayikhro` | `delayMicroseconds` |
| `iimilisekondi` | `millis` |
| `iimayikhrosekondi` | `micros` |
| `thintela` | `constrain` |
| `ithoni` | `tone` |
| `misa_ithoni` | `noTone` |
| `ncamathisela_uphazamiso` | `attachInterrupt` |
| `PHEZULU` | `HIGH` |
| `EZANTSI` | `LOW` |
| `OKUPHUMAYO` | `OUTPUT` |
| `OKUNGENAYO` | `INPUT` |
| `OKUNGENAYO_KUTSALWE` | `INPUT_PULLUP` |
| `ILED_EYAKHIWEYO` | `LED_BUILTIN` |
| `Isiriyali` | `Serial` |
| `bonisa` | `print` |
| `bonisa_umgca` | `println` |
| `efumanekayo` | `available` |
| `funda_ibhayithi` | `read` |
| `bhala_ibhayithi` | `write` |

# Library packs

A pack switches on when you include one of its headers (in your language or in English).

## Arduino libraries

Headers: `#faka <iservo>` = `<Servo.h>`, `#faka <ucingo>` = `<Wire.h>`, `#faka <ibhasi_spi>` = `<SPI.h>`, `#faka <inkumbulo_ehlalayo>` = `<EEPROM.h>`

| isiXhosa | C++ |
|---|---|
| `Iservo` | `Servo` |
| `qhagamshela` | `attach` |
| `bhala_iimayikhrosekondi` | `writeMicroseconds` |
| `Ucingo` | `Wire` |
| `qala_ukuthumela` | `beginTransmission` |
| `gqiba_ukuthumela` | `endTransmission` |
| `cela_ku` | `requestFrom` |
| `xa_kufunyenwe` | `onReceive` |
| `xa_kuceliwe` | `onRequest` |
| `Ibhasi_spi` | `SPI` |
| `dlulisa` | `transfer` |
| `Inkumbulo_ehlalayo` | `EEPROM` |
| `faka_kuyo` | `put` |
| `hlaziya` | `update` |

## Arduino (always on)

| isiXhosa | C++ |
|---|---|
| `khetha_ngokungacwangciswanga` | `random` |
| `imbewu_yokungacwangciswanga` | `randomSeed` |
| `linganisa_kwakhona` | `map` |
| `linganisa_ipalsi` | `pulseIn` |
| `iphini_ukuya_kuphazamiso` | `digitalPinToInterrupt` |
| `XA_KUNYUKA` | `RISING` |
| `XA_KUHLA` | `FALLING` |
| `XA_KUTSHINTSHA` | `CHANGE` |
| `vumela_uphazamiso` | `interrupts` |
| `thintela_uphazamiso` | `noInterrupts` |
| `funda_inani` | `parseInt` |
| `funda_idesimali` | `parseFloat` |
| `funda_umbhalo` | `readString` |
| `funda_umbhalo_de` | `readStringUntil` |
| `ibe_linani` | `toInt` |
| `ibe_yidesimali` | `toFloat` |
| `indawo_ka` | `indexOf` |
| `inxenye_yombhalo` | `substring` |
| `sika_izithuba` | `trim` |
| `ibe_nkulu` | `toUpperCase` |
| `ibe_ncinci` | `toLowerCase` |
| `iqala_ngo` | `startsWith` |
| `iphela_ngo` | `endsWith` |

## CUDA

Headers: `#faka <igpu>` = `<cuda_runtime.h>`

| isiXhosa | C++ |
|---|---|
| `umsebenzi_wegpu` | `__global__` |
| `okwegpu` | `__device__` |
| `okwekhompyutha` | `__host__` |
| `okwabelwanayo_gpu` | `__shared__` |
| `vumelanisa_imisonto` | `__syncthreads` |
| `inani_lomsonto` | `threadIdx` |
| `inani_lebhloko` | `blockIdx` |
| `ubungakanani_bebhloko` | `blockDim` |
| `ubungakanani_begridi` | `gridDim` |
| `ubungakanani3` | `dim3` |
| `gpu_beka_inkumbulo` | `cudaMalloc` |
| `gpu_khulula_inkumbulo` | `cudaFree` |
| `gpu_kopa_inkumbulo` | `cudaMemcpy` |
| `UKUSUKA_KWIKHOMPYUTHA_UYE_GPU` | `cudaMemcpyHostToDevice` |
| `UKUSUKA_GPU_UYE_KWIKHOMPYUTHA` | `cudaMemcpyDeviceToHost` |
| `gpu_linda_igqibe` | `cudaDeviceSynchronize` |
| `gpu_impazamo_yokugqibela` | `cudaGetLastError` |
| `gpu_umbhalo_wempazamo` | `cudaGetErrorString` |
| `Impazamo_yegpu` | `cudaError_t` |
| `GPU_KUPHUMELELE` | `cudaSuccess` |

## Eigen

Headers: `#faka <iimatriki>` = `<Eigen/Dense>`, `#faka <iimatriki_isiseko>` = `<Eigen/Core>`, `#faka <ijiyometri>` = `<Eigen/Geometry>`

| isiXhosa | C++ |
|---|---|
| `iimatriki` | `Eigen` |
| `Imatriki` | `Eigen::MatrixXd` |
| `Ivektha` | `Eigen::VectorXd` |
| `Imatriki3` | `Eigen::Matrix3d` |
| `Imatriki4` | `Eigen::Matrix4d` |
| `Ivektha3` | `Eigen::Vector3d` |
| `Imatriki_yohlobo` | `Eigen::Matrix` |
| `Ikhwatheniyoni` | `Eigen::Quaterniond` |
| `Ikona_ne_eksisi` | `Eigen::AngleAxisd` |
| `Ubunye` | `Identity` |
| `Uziro` | `Zero` |
| `Zonke_zinye` | `Ones` |
| `Ngokungacwangciswanga` | `Random` |
| `jika_imatriki` | `transpose` |
| `okuchaseneyo` | `inverse` |
| `isigqibo` | `determinant` |
| `ubude_bevektha` | `norm` |
| `ilungelelanisiwe` | `normalized` |
| `imveliso_yechaphaza` | `dot` |
| `imveliso_yomnqamlezo` | `cross` |
| `sombulula` | `solve` |
| `ahlula_qr` | `colPivHouseholderQr` |
| `phantse_ziyalingana` | `isApprox` |
| `Eksisi_X` | `UnitX` |
| `Eksisi_Y` | `UnitY` |
| `Eksisi_Z` | `UnitZ` |
| `ibe_matriki` | `matrix` |

## OpenCV

Headers: `#faka <umbono>` = `<opencv2/opencv.hpp>`, `#faka <umbono_isiseko>` = `<opencv2/core.hpp>`, `#faka <umbono_imifanekiso>` = `<opencv2/imgproc.hpp>`, `#faka <umbono_iifestile>` = `<opencv2/highgui.hpp>`, `#faka <umbono_ividiyo>` = `<opencv2/videoio.hpp>`, `#faka <umbono_ukufumana_izinto>` = `<opencv2/objdetect.hpp>`

| isiXhosa | C++ |
|---|---|
| `umbono` | `cv` |
| `Umfanekiso` | `cv::Mat` |
| `funda_umfanekiso` | `cv::imread` |
| `gcina_umfanekiso` | `cv::imwrite` |
| `bonisa_umfanekiso` | `cv::imshow` |
| `linda_iqhosha` | `cv::waitKey` |
| `yila_ifestile` | `cv::namedWindow` |
| `vala_iifestile_zonke` | `cv::destroyAllWindows` |
| `guqula_umbala` | `cv::cvtColor` |
| `UMBALA_UYE_KONGWEVU` | `cv::COLOR_BGR2GRAY` |
| `UMBALA_UYE_KU_HSV` | `cv::COLOR_BGR2HSV` |
| `UMBALA_UYE_KU_RGB` | `cv::COLOR_BGR2RGB` |
| `fiphaza` | `cv::GaussianBlur` |
| `fumana_imiphetho` | `cv::Canny` |
| `umda_wokwahlula` | `cv::threshold` |
| `UMDA_OMBINI` | `cv::THRESH_BINARY` |
| `tshintsha_ubungakanani_bomfanekiso` | `cv::resize` |
| `zoba_uxande` | `cv::rectangle` |
| `zoba_isangqa` | `cv::circle` |
| `zoba_umgca` | `cv::line` |
| `bhala_emfanekisweni` | `cv::putText` |
| `Inqaku` | `cv::Point` |
| `Ububanzi_nobude` | `cv::Size` |
| `Ixabiso_lombala` | `cv::Scalar` |
| `Ummandla` | `cv::Rect` |
| `Ikhamera` | `cv::VideoCapture` |
| `ivuliwe` | `isOpened` |
| `imigca` | `rows` |
| `iikholamu` | `cols` |
| `amajelo` | `channels` |
| `yenza_ikopi` | `clone` |
| `kopela_ku` | `copyTo` |
| `fumana_imida_yezinto` | `cv::findContours` |
| `zoba_imida_yezinto` | `cv::drawContours` |
| `indawo_yomda_wento` | `cv::contourArea` |
| `ngaphakathi_komda` | `cv::inRange` |
| `Umahluli` | `cv::CascadeClassifier` |
| `fumana_izinto` | `detectMultiScale` |
| `layisha` | `load` |
| `FUNDA_NGEMIBALA` | `cv::IMREAD_COLOR` |
| `FUNDA_NGONGWEVU` | `cv::IMREAD_GRAYSCALE` |
| `IFONTI_ELULA` | `cv::FONT_HERSHEY_SIMPLEX` |
| `Ipikseli` | `cv::Vec3b` |
| `kuzaliswe_ngo0` | `zeros` |
| `kuzaliswe_ngo1` | `ones` |
| `IMIDA_YANGAPHANDLE` | `cv::RETR_EXTERNAL` |
| `IMIDA_ELULA` | `cv::CHAIN_APPROX_SIMPLE` |
| `ibhokisi_elingqongileyo` | `cv::boundingRect` |
| `UMBALA_8BIT_3` | `CV_8UC3` |
| `ububanzi` | `width` |
| `ukuphakama` | `height` |

## ROS 2

Headers: `#faka <ros2>` = `<rclcpp/rclcpp.hpp>`, `#faka <umyalezo_wombhalo>` = `<std_msgs/msg/string.hpp>`, `#faka <umyalezo_wenani>` = `<std_msgs/msg/int32.hpp>`, `#faka <umyalezo_wedesimali>` = `<std_msgs/msg/float64.hpp>`, `#faka <umyalezo_webhuli>` = `<std_msgs/msg/bool.hpp>`, `#faka <umyalelo_wesantya>` = `<geometry_msgs/msg/twist.hpp>`, `#faka <ukuskena_kwelaser>` = `<sensor_msgs/msg/laser_scan.hpp>`, `#faka <umfanekiso_wesivamvo>` = `<sensor_msgs/msg/image.hpp>`

| isiXhosa | C++ |
|---|---|
| `ros` | `rclcpp` |
| `qalisa_ros` | `rclcpp::init` |
| `vala_ros` | `rclcpp::shutdown` |
| `qhuba_ros` | `rclcpp::spin` |
| `qhuba_ros_kancinci` | `rclcpp::spin_some` |
| `ros_isaphila` | `rclcpp::ok` |
| `Iqhina` | `rclcpp::Node` |
| `Umsasazi` | `rclcpp::Publisher` |
| `Ubhaliso` | `rclcpp::Subscription` |
| `Isibali_xesha` | `rclcpp::TimerBase` |
| `yila_umsasazi` | `create_publisher` |
| `yila_ubhaliso` | `create_subscription` |
| `yila_isibali_xesha` | `create_wall_timer` |
| `sasaza` | `publish` |
| `umbhali_wembali` | `get_logger` |
| `ROS_ULWAZI` | `RCLCPP_INFO` |
| `ROS_ISILUMKISO` | `RCLCPP_WARN` |
| `ROS_IMPAZAMO` | `RCLCPP_ERROR` |
| `Isalathisi` | `SharedPtr` |
| `idatha` | `data` |
| `ngqo` | `linear` |
| `ujikelezo` | `angular` |
| `imigama` | `ranges` |
| `bhengeza_iparamitha` | `declare_parameter` |
| `fumana_iparamitha` | `get_parameter` |
| `umyalezo_wombhalo` | `std_msgs::msg::String` |
| `umyalezo_wenani` | `std_msgs::msg::Int32` |
| `umyalezo_wedesimali` | `std_msgs::msg::Float64` |
| `umyalezo_webhuli` | `std_msgs::msg::Bool` |
| `umyalelo_wesantya` | `geometry_msgs::msg::Twist` |
| `ukuskena_kwelaser` | `sensor_msgs::msg::LaserScan` |
| `umfanekiso_wesivamvo` | `sensor_msgs::msg::Image` |

## Standard library extras (always on)

| isiXhosa | C++ |
|---|---|
| `idatha` | `data` |

## PyTorch (libtorch)

Headers: `#faka <ukufunda_koomatshini>` = `<torch/torch.h>`

| isiXhosa | C++ |
|---|---|
| `ukufunda_koomatshini` | `torch` |
| `Ithensa` | `torch::Tensor` |
| `yenza_ithensa` | `torch::tensor` |
| `kuzaliswe_ngo0` | `torch::zeros` |
| `kuzaliswe_ngo1` | `torch::ones` |
| `ithensa_engacwangciswanga` | `torch::rand` |
| `ithensa_engacwangciswanga_eqhelekileyo` | `torch::randn` |
| `misela_imbewu` | `torch::manual_seed` |
| `Icandelo_lenethiwekhi` | `torch::nn::Module` |
| `Umaleko_othe_ngqo` | `torch::nn::Linear` |
| `Umaleko_wokudibanisa2d` | `torch::nn::Conv2d` |
| `isivuseleli_relu` | `torch::relu` |
| `ilogi_yamathuba` | `torch::log_softmax` |
| `ilahleko_yesikwere` | `torch::mse_loss` |
| `ilahleko_yamathuba` | `torch::nll_loss` |
| `Isiphuculi_SGD` | `torch::optim::SGD` |
| `Isiphuculi_Adam` | `torch::optim::Adam` |
| `Isixhobo` | `torch::Device` |
| `KWI_GPU` | `torch::kCUDA` |
| `KWI_CPU` | `torch::kCPU` |
| `igpu_ikhona` | `torch::cuda::is_available` |
| `gcina_imodeli` | `torch::save` |
| `layisha_imodeli` | `torch::load` |
| `Umgcini_ongafundi` | `torch::NoGradGuard` |
| `bhalisa_icandelo` | `register_module` |
| `dlulisela_phambili` | `forward` |
| `buyela_umva` | `backward` |
| `cima_ithambeka` | `zero_grad` |
| `thatha_inyathelo` | `step` |
| `yisa_ku` | `to` |
| `ixabiso_elinye` | `item` |
| `jonga_njenge` | `view` |
| `tshintsha_imilo` | `reshape` |
| `phinda_iimatriki` | `matmul` |
| `isixa_sethensa` | `sum` |
| `umndilili_wethensa` | `mean` |
| `isalathiso_esikhulu` | `argmax` |
| `iiparamitha` | `parameters` |
| `qeqesha` | `train` |
| `vavanya_imodeli` | `eval` |
