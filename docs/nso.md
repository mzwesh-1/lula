# Lula: Sepedi (Sesotho sa Leboa) reference

> draft - needs review by Sepedi speakers

Every word below can be used in `.nso.lula` files. Plain English C++ keeps working too.

## Keywords: Control flow

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `ge` | `if` |
| `go_sego_bjalo` | `else` |
| `kgetha` | `switch` |
| `seemo` | `case` |
| `tlwaelo` | `default` |
| `ge_fela` | `while` |
| `dira` | `do` |
| `dikologa` | `for` |
| `kgaotša` | `break` |
| `tšwela_pele` | `continue` |
| `bušetša` | `return` |
| `tlolela` | `goto` |
| `leka` | `try` |
| `swara` | `catch` |
| `lahlela` | `throw` |
| `co_leta` | `co_await` |
| `co_bušetša` | `co_return` |
| `co_tšweletša` | `co_yield` |

## Keywords: Data types

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `palo` | `int` |
| `tesimale` | `float` |
| `tesimale_gabedi` | `double` |
| `tlhaka` | `char` |
| `tlhaka8` | `char8_t` |
| `tlhaka16` | `char16_t` |
| `tlhaka32` | `char32_t` |
| `tlhaka_ye_pharaletšego` | `wchar_t` |
| `bulini` | `bool` |
| `lefeela` | `void` |
| `kopana` | `short` |
| `telele` | `long` |
| `ka_leswao` | `signed` |
| `ntle_le_leswao` | `unsigned` |
| `ka_boithomelo` | `auto` |
| `mohuta_wa` | `decltype` |

## Keywords: Modifiers

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `sa_fetogego` | `const` |
| `pele_ga_nako` | `constexpr` |
| `lekola_pele` | `consteval` |
| `thoma_pele` | `constinit` |
| `emego` | `static` |
| `ya_ka_ntle` | `extern` |
| `fetogago_kapejana` | `volatile` |
| `fetogago` | `mutable` |
| `ka_gare` | `inline` |
| `rejisetara` | `register` |
| `ya_mogala` | `thread_local` |
| `ka_go_hlaka` | `explicit` |
| `ntle_le_phošo` | `noexcept` |
| `beakanya` | `alignas` |

## Keywords: Classes, objects and structure

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `sehlopha` | `class` |
| `sebopego` | `struct` |
| `kopano` | `union` |
| `lelokelelo` | `enum` |
| `setšhaba` | `public` |
| `sephiri` | `private` |
| `šireleditšwego` | `protected` |
| `bonagalago` | `virtual` |
| `tšea_sebaka` | `override` |
| `ya_mafelelo` | `final` |
| `mogwera` | `friend` |
| `seo` | `this` |
| `mpsha` | `new` |
| `phumola` | `delete` |
| `opareitara` | `operator` |
| `mohlala` | `template` |
| `mohuta` | `typename` |
| `kgopolo` | `concept` |
| `nyaka` | `requires` |
| `lefelo_la_maina` | `namespace` |
| `šomiša` | `using` |
| `leina_le_lefsa` | `typedef` |
| `romela_ntle` | `export` |
| `tsenya` | `import` |
| `mojule` | `module` |
| `kopanyi` | `asm` |

## Keywords: Casts and compile-time

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `fetoša` | `static_cast` |
| `fetoša_ka_nako` | `dynamic_cast` |
| `fetoša_sa_fetogego` | `const_cast` |
| `fetoša_ka_maatla` | `reinterpret_cast` |
| `hwetša_mohuta` | `typeid` |
| `bogolo_bja` | `sizeof` |
| `peakanyo_ya` | `alignof` |
| `netefatša` | `static_assert` |

## Keywords: Constants

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `therešo` | `true` |
| `maaka` | `false` |
| `ga_go_selo` | `nullptr` |

## Keywords: Word operators

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `le` | `and` |
| `goba` | `or` |
| `aowa` | `not` |
| `ga_e_lekane` | `not_eq` |
| `le_lekana` | `and_eq` |
| `goba_lekana` | `or_eq` |
| `goba_fela` | `xor` |
| `goba_fela_lekana` | `xor_eq` |
| `le_biti` | `bitand` |
| `goba_biti` | `bitor` |
| `fetoša_biti` | `compl` |

## Preprocessor

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `#tsenya_ka_gare` | `#include` |
| `#hlaloša` | `#define` |
| `#phumola_tlhalošo` | `#undef` |
| `#ge` | `#if` |
| `#ge_go_hlalošitšwe` | `#ifdef` |
| `#ge_go_sa_hlalošwa` | `#ifndef` |
| `#goba_ge` | `#elif` |
| `#goba_ge_go_hlalošitšwe` | `#elifdef` |
| `#goba_ge_go_sa_hlalošwa` | `#elifndef` |
| `#go_sego_bjalo` | `#else` |
| `#fetša_ge` | `#endif` |
| `#mothaladi` | `#line` |
| `#phošo` | `#error` |
| `#temošo` | `#warning` |
| `#taelo` | `#pragma` |

## Header files

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `<tšohle>` | `<bits/stdc++.h>` |
| `<tseno_le_tšwelo>` | `<iostream>` |
| `<sengwalwa>` | `<string>` |
| `<lenaneo>` | `<vector>` |
| `<mmapa>` | `<map>` |
| `<mmapa_wo_sa_beakanywago>` | `<unordered_map>` |
| `<sete>` | `<set>` |
| `<sete_ye_sa_beakanywago>` | `<unordered_set>` |
| `<mothaladi_wa_go_leta>` | `<queue>` |
| `<mokgobo>` | `<stack>` |
| `<mothaladi_wo_mabedi>` | `<deque>` |
| `<lelokelelo_le_kgokagantšwego>` | `<list>` |
| `<tatelano>` | `<array>` |
| `<mekgwa>` | `<algorithm>` |
| `<dipalo>` | `<cmath>` |
| `<laeborari_c>` | `<cstdlib>` |
| `<nako>` | `<ctime>` |
| `<difaele>` | `<fstream>` |
| `<moela_wa_sengwalwa>` | `<sstream>` |
| `<peakanyo_ya_ditšweletšo>` | `<iomanip>` |
| `<thušo>` | `<utility>` |
| `<memori>` | `<memory>` |
| `<mešomo>` | `<functional>` |
| `<dinomoro>` | `<numeric>` |
| `<mellwane>` | `<limits>` |
| `<mellwane_c>` | `<climits>` |
| `<dipalo_tša_bogolo>` | `<cstdint>` |
| `<sengwalwa_c>` | `<cstring>` |
| `<ditlhaka>` | `<cctype>` |
| `<nako_ye_nepagetšego>` | `<chrono>` |
| `<mogala>` | `<thread>` |
| `<senotlelo>` | `<mutex>` |
| `<tiragalo_ye_sa_letelwago>` | `<exception>` |
| `<diphošo>` | `<stdexcept>` |
| `<mosepelo>` | `<iterator>` |
| `<sehlophana>` | `<tuple>` |
| `<ka_boikgethelo>` | `<optional>` |
| `<ka_tšhoganetšo>` | `<random>` |
| `<dibiti>` | `<bitset>` |

## Library: Core

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `ye_kgolo` | `main` |
| `motheo` | `std` |
| `hlalošitšwe` | `defined` |
| `gatiša` | `printf` |
| `sekena` | `scanf` |

## Library: Input / output and files

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `ngwala` | `std::cout` |
| `bala` | `std::cin` |
| `ngwala_phošo` | `std::cerr` |
| `ngwala_histori` | `std::clog` |
| `mothaladi_wo_mofsa` | `std::endl` |
| `bala_mothaladi` | `std::getline` |
| `phatlalatša` | `std::flush` |
| `ditesimale_tše_tiilego` | `std::fixed` |
| `bea_nepagalo` | `std::setprecision` |
| `bea_bophara` | `std::setw` |
| `faele_ya_go_bala` | `std::ifstream` |
| `faele_ya_go_ngwala` | `std::ofstream` |
| `faele` | `std::fstream` |
| `moela_wa_sengwalwa` | `std::stringstream` |
| `moela_wa_go_bala` | `std::istringstream` |
| `moela_wa_go_ngwala` | `std::ostringstream` |

## Library: Data types

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `palo_ya_bogolo` | `std::size_t` |
| `palo8` | `std::int8_t` |
| `palo16` | `std::int16_t` |
| `palo32` | `std::int32_t` |
| `palo64` | `std::int64_t` |
| `palo_u8` | `std::uint8_t` |
| `palo_u16` | `std::uint16_t` |
| `palo_u32` | `std::uint32_t` |
| `palo_u64` | `std::uint64_t` |

## Library: Containers (STL)

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `sengwalwa` | `std::string` |
| `lenaneo` | `std::vector` |
| `mmapa` | `std::map` |
| `mmapa_wo_sa_beakanywago` | `std::unordered_map` |
| `mmapa_wo_montši` | `std::multimap` |
| `sete` | `std::set` |
| `sete_ye_sa_beakanywago` | `std::unordered_set` |
| `sete_ye_ntši` | `std::multiset` |
| `mothaladi_wa_go_leta` | `std::queue` |
| `mothaladi_wa_bohlokwa` | `std::priority_queue` |
| `mokgobo` | `std::stack` |
| `mothaladi_wo_mabedi` | `std::deque` |
| `lelokelelo_le_kgokagantšwego` | `std::list` |
| `tatelano` | `std::array` |
| `para` | `std::pair` |
| `sehlophana` | `std::tuple` |
| `dibiti` | `std::bitset` |
| `ka_boikgethelo` | `std::optional` |
| `dira_para` | `std::make_pair` |
| `dira_sehlophana` | `std::make_tuple` |
| `tšea` | `std::get` |
| `bofa` | `std::tie` |
| `šuthiša` | `std::move` |

## Library: Smart pointers

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `sešupi_se_tee` | `std::unique_ptr` |
| `sešupi_se_abelanwago` | `std::shared_ptr` |
| `sešupi_se_fokolago` | `std::weak_ptr` |
| `dira_se_tee` | `std::make_unique` |
| `dira_se_abelanwago` | `std::make_shared` |

## Library: Algorithms

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `beakanya_ka_tatelano` | `std::sort` |
| `bušetša_morago` | `std::reverse` |
| `hwetša` | `std::find` |
| `bala_palo` | `std::count` |
| `ye_kgolo_kudu` | `std::max` |
| `ye_nnyane_kudu` | `std::min` |
| `selo_se_segolo` | `std::max_element` |
| `selo_se_senyane` | `std::min_element` |
| `kgoboketša_palomoka` | `std::accumulate` |
| `nyaka_gabedi` | `std::binary_search` |
| `mollwane_wa_fase` | `std::lower_bound` |
| `mollwane_wa_godimo` | `std::upper_bound` |
| `tlatša` | `std::fill` |
| `kopiša` | `std::copy` |
| `fetoša_tšohle` | `std::transform` |
| `se_sengwe_le_se_sengwe` | `std::for_each` |
| `tloša_tše_boeleditšwego` | `std::unique` |
| `peakanyo_ye_e_latelago` | `std::next_permutation` |
| `fapantšha` | `std::swap` |
| `latelanya` | `std::iota` |

## Library: Math

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `boleng_bjo_bo_feletšego` | `std::abs` |
| `modu` | `std::sqrt` |
| `maatla` | `std::pow` |
| `godiša` | `std::ceil` |
| `fokotša` | `std::floor` |
| `batamela` | `std::round` |
| `saene` | `std::sin` |
| `khosaene` | `std::cos` |
| `tantšente` | `std::tan` |
| `logo` | `std::log` |
| `logo10` | `std::log10` |
| `eksponente` | `std::exp` |
| `haepotenuse` | `std::hypot` |
| `šalago` | `std::fmod` |
| `searoganyi_se_segolo` | `std::gcd` |
| `palo_ye_nnyane_ya_go_swana` | `std::lcm` |
| `mellwane_ya_dipalo` | `std::numeric_limits` |
| `ka_tšhoganetšo` | `std::rand` |
| `bjala_tšhoganetšo` | `std::srand` |
| `nako` | `std::time` |

## Library: Strings and characters

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `go_sengwalwa` | `std::to_string` |
| `go_palo` | `std::stoi` |
| `go_palo_ye_telele` | `std::stol` |
| `go_tesimale` | `std::stod` |
| `go_tlhaka_ye_kgolo` | `std::toupper` |
| `go_tlhaka_ye_nnyane` | `std::tolower` |
| `ke_nomoro` | `std::isdigit` |
| `ke_tlhaka` | `std::isalpha` |
| `ke_sekgoba` | `std::isspace` |
| `ke_ye_kgolo` | `std::isupper` |
| `ke_ye_nnyane` | `std::islower` |

## Library: Exceptions

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `tiragalo_ye_sa_letelwago` | `std::exception` |
| `phošo_ya_tirišo` | `std::runtime_error` |
| `phošo_ya_kgopolo` | `std::logic_error` |
| `ka_ntle_ga_mollwane` | `std::out_of_range` |
| `kganetšo_ye_fošagetšego` | `std::invalid_argument` |

## Library: Threads

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `mogala` | `std::thread` |
| `senotlelo` | `std::mutex` |
| `mohlokomedi_wa_senotlelo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `bogolo` | `size` |
| `botelele` | `length` |
| `ga_go_na_selo` | `empty` |
| `oketša_mafelelong` | `push_back` |
| `tloša_mafelelong` | `pop_back` |
| `oketša_mathomong` | `push_front` |
| `tloša_mathomong` | `pop_front` |
| `bea` | `emplace` |
| `bea_mafelelong` | `emplace_back` |
| `oketša` | `push` |
| `ntšha` | `pop` |
| `godimo` | `top` |
| `pele` | `front` |
| `morago` | `back` |
| `mathomo` | `begin` |
| `mafelelo` | `end` |
| `mathomo_morago` | `rbegin` |
| `mafelelo_morago` | `rend` |
| `phumola_tšohle` | `clear` |
| `tsenya_gare` | `insert` |
| `sula` | `erase` |
| `lefelong` | `at` |
| `karolo` | `substr` |
| `kgomaretša` | `append` |
| `sengwalwa_c` | `c_str` |
| `bapetša` | `compare` |
| `tšeela_sebaka` | `replace` |
| `fetoša_bogolo` | `resize` |
| `boloka_sebaka` | `reserve` |
| `bokgoni` | `capacity` |
| `ya_pele` | `first` |
| `ya_bobedi` | `second` |
| `ke_eng` | `what` |
| `bula` | `open` |
| `tswalela` | `close` |
| `e_butšwe` | `is_open` |
| `mafelelo_a_faele` | `eof` |
| `sengwalwa_ka_moka` | `str` |
| `bea_lefsa` | `reset` |
| `lokolla` | `release` |
| `kopanya` | `join` |
| `aroganya` | `detach` |
| `notlela` | `lock` |
| `notlolla` | `unlock` |

## Library: Arduino / robots

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `thoma` | `setup` |
| `boeletša` | `loop` |
| `bea_phini` | `pinMode` |
| `ngwala_dijithale` | `digitalWrite` |
| `bala_dijithale` | `digitalRead` |
| `bala_analoko` | `analogRead` |
| `ngwala_analoko` | `analogWrite` |
| `leta` | `delay` |
| `leta_maekro` | `delayMicroseconds` |
| `dimilisekhontse` | `millis` |
| `dimaekrosekhontse` | `micros` |
| `thibela` | `constrain` |
| `modumo` | `tone` |
| `emiša_modumo` | `noTone` |
| `kgokaganya_tšhitišo` | `attachInterrupt` |
| `GODIMO` | `HIGH` |
| `FASE` | `LOW` |
| `TŠE_TŠWAGO` | `OUTPUT` |
| `TŠE_TSENAGO` | `INPUT` |
| `TŠE_TSENAGO_GO_GOGA` | `INPUT_PULLUP` |
| `LED_YA_KA_GARE` | `LED_BUILTIN` |
| `Seriale` | `Serial` |
| `bontšha` | `print` |
| `bontšha_mothaladi` | `println` |
| `e_hwetšagalago` | `available` |
| `bala_paete` | `read` |
| `ngwala_paete` | `write` |

# Library packs

A pack switches on when you include one of its headers (in your language or in English).

## Arduino libraries

Headers: `#tsenya_ka_gare <servo>` = `<Servo.h>`, `#tsenya_ka_gare <terata>` = `<Wire.h>`, `#tsenya_ka_gare <bese_ya_spi>` = `<SPI.h>`, `#tsenya_ka_gare <memori_ye_dulago>` = `<EEPROM.h>`

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `Seservo` | `Servo` |
| `kgokaganya` | `attach` |
| `ngwala_dimaekrosekhontse` | `writeMicroseconds` |
| `Terata` | `Wire` |
| `thoma_go_romela` | `beginTransmission` |
| `fetša_go_romela` | `endTransmission` |
| `kgopela_go` | `requestFrom` |
| `ge_go_amogelwa` | `onReceive` |
| `ge_go_kgopelwa` | `onRequest` |
| `Bese_ya_spi` | `SPI` |
| `fetišetša` | `transfer` |
| `Memori_ye_dulago` | `EEPROM` |
| `tsenya_go_yona` | `put` |
| `mpshafatša` | `update` |

## Arduino (always on)

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `kgetha_ka_tšhoganetšo` | `random` |
| `peu_ya_tšhoganetšo` | `randomSeed` |
| `lekanya_lefsa` | `map` |
| `lekanya_phalese` | `pulseIn` |
| `phini_go_tšhitišo` | `digitalPinToInterrupt` |
| `GE_E_ROTOGA` | `RISING` |
| `GE_E_THEOGA` | `FALLING` |
| `GE_E_FETOGA` | `CHANGE` |
| `dumelela_ditšhitišo` | `interrupts` |
| `thibela_ditšhitišo` | `noInterrupts` |
| `bala_nomoro` | `parseInt` |
| `bala_tesimale` | `parseFloat` |
| `bala_sengwalwa` | `readString` |
| `bala_sengwalwa_go_fihla` | `readStringUntil` |
| `e_be_palo` | `toInt` |
| `e_be_tesimale` | `toFloat` |
| `lefelo_la` | `indexOf` |
| `karolo_ya_sengwalwa` | `substring` |
| `ripa_sekgoba` | `trim` |
| `e_be_ditlhaka_tše_kgolo` | `toUpperCase` |
| `e_be_ditlhaka_tše_nnyane` | `toLowerCase` |
| `e_thoma_ka` | `startsWith` |
| `e_fela_ka` | `endsWith` |

## CUDA

Headers: `#tsenya_ka_gare <gpu>` = `<cuda_runtime.h>`

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `mošomo_wa_gpu` | `__global__` |
| `ya_gpu` | `__device__` |
| `ya_khomphuthara` | `__host__` |
| `e_abelanwago_gpu` | `__shared__` |
| `lekanya_megala` | `__syncthreads` |
| `palo_ya_mogala` | `threadIdx` |
| `palo_ya_poloko` | `blockIdx` |
| `bogolo_bja_poloko` | `blockDim` |
| `bogolo_bja_gridi` | `gridDim` |
| `bogolo3` | `dim3` |
| `gpu_abela_memori` | `cudaMalloc` |
| `gpu_lokolla_memori` | `cudaFree` |
| `gpu_kopiša_memori` | `cudaMemcpy` |
| `GO_TŠWA_KHOMPHUTHARA_GO_GPU` | `cudaMemcpyHostToDevice` |
| `GO_TŠWA_GPU_GO_KHOMPHUTHARA` | `cudaMemcpyDeviceToHost` |
| `gpu_leta_e_fetše` | `cudaDeviceSynchronize` |
| `gpu_phošo_ya_mafelelo` | `cudaGetLastError` |
| `gpu_sengwalwa_sa_phošo` | `cudaGetErrorString` |
| `Phošo_ya_gpu` | `cudaError_t` |
| `GPU_E_ATLEGILE` | `cudaSuccess` |

## Eigen

Headers: `#tsenya_ka_gare <dimatriki>` = `<Eigen/Dense>`, `#tsenya_ka_gare <dimatriki_motheo>` = `<Eigen/Core>`, `#tsenya_ka_gare <jeometri>` = `<Eigen/Geometry>`

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `dimatriki` | `Eigen` |
| `Matriki` | `Eigen::MatrixXd` |
| `Bekthara` | `Eigen::VectorXd` |
| `Matriki3` | `Eigen::Matrix3d` |
| `Matriki4` | `Eigen::Matrix4d` |
| `Bekthara3` | `Eigen::Vector3d` |
| `Matriki_ya_mohuta` | `Eigen::Matrix` |
| `Kwatheniono` | `Eigen::Quaterniond` |
| `Khutlo_le_ekese` | `Eigen::AngleAxisd` |
| `Botee` | `Identity` |
| `Ziro` | `Zero` |
| `Ka_moka_ke_tee` | `Ones` |
| `Ka_tšhoganetšo` | `Random` |
| `fetoša_matriki` | `transpose` |
| `ye_e_fapanego` | `inverse` |
| `phetho` | `determinant` |
| `botelele_bja_bekthara` | `norm` |
| `e_lekanyeditšwe` | `normalized` |
| `setšweletšwa_sa_ntlha` | `dot` |
| `setšweletšwa_sa_sefapano` | `cross` |
| `rarolla` | `solve` |
| `aroganya_qr` | `colPivHouseholderQr` |
| `di_nyaka_di_lekana` | `isApprox` |
| `Ekese_X` | `UnitX` |
| `Ekese_Y` | `UnitY` |
| `Ekese_Z` | `UnitZ` |
| `e_be_matriki` | `matrix` |

## OpenCV

Headers: `#tsenya_ka_gare <pono>` = `<opencv2/opencv.hpp>`, `#tsenya_ka_gare <pono_motheo>` = `<opencv2/core.hpp>`, `#tsenya_ka_gare <pono_diswantšho>` = `<opencv2/imgproc.hpp>`, `#tsenya_ka_gare <pono_mafasetere>` = `<opencv2/highgui.hpp>`, `#tsenya_ka_gare <pono_bidio>` = `<opencv2/videoio.hpp>`, `#tsenya_ka_gare <pono_go_hwetša_dilo>` = `<opencv2/objdetect.hpp>`

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `pono` | `cv` |
| `Seswantšho` | `cv::Mat` |
| `bala_seswantšho` | `cv::imread` |
| `boloka_seswantšho` | `cv::imwrite` |
| `bontšha_seswantšho` | `cv::imshow` |
| `leta_konopo` | `cv::waitKey` |
| `hlama_lefasetere` | `cv::namedWindow` |
| `tswalela_mafasetere_ka_moka` | `cv::destroyAllWindows` |
| `fetoša_mmala` | `cv::cvtColor` |
| `MMALA_GO_PUTSWA` | `cv::COLOR_BGR2GRAY` |
| `MMALA_GO_HSV` | `cv::COLOR_BGR2HSV` |
| `MMALA_GO_RGB` | `cv::COLOR_BGR2RGB` |
| `fifatša` | `cv::GaussianBlur` |
| `hwetša_mathoko` | `cv::Canny` |
| `mollwane_wa_karogano` | `cv::threshold` |
| `MOLLWANE_WO_MABEDI` | `cv::THRESH_BINARY` |
| `fetoša_bogolo_bja_seswantšho` | `cv::resize` |
| `thala_khutlonne` | `cv::rectangle` |
| `thala_sediko` | `cv::circle` |
| `thala_mothaladi` | `cv::line` |
| `ngwala_seswantšhong` | `cv::putText` |
| `Ntlha` | `cv::Point` |
| `Bophara_le_botelele` | `cv::Size` |
| `Boleng_bja_mmala` | `cv::Scalar` |
| `Lefelwana` | `cv::Rect` |
| `Khamera` | `cv::VideoCapture` |
| `e_bulegile` | `isOpened` |
| `methaladi` | `rows` |
| `dikholomo` | `cols` |
| `dikanale` | `channels` |
| `dira_khopi` | `clone` |
| `kopišetša_go` | `copyTo` |
| `hwetša_dithalwana` | `cv::findContours` |
| `thala_dithalwana` | `cv::drawContours` |
| `bogolo_bja_sethalwana` | `cv::contourArea` |
| `ka_gare_ga_mollwane` | `cv::inRange` |
| `Mohlaodi` | `cv::CascadeClassifier` |
| `hwetša_dilo` | `detectMultiScale` |
| `laiša` | `load` |
| `BALA_KA_MMALA` | `cv::IMREAD_COLOR` |
| `BALA_KA_PUTSWA` | `cv::IMREAD_GRAYSCALE` |
| `FONTO_YE_BONOLO` | `cv::FONT_HERSHEY_SIMPLEX` |
| `Phikisele` | `cv::Vec3b` |
| `tše_tletšego_0` | `zeros` |
| `tše_tletšego_1` | `ones` |
| `DITHALWANA_TŠA_KA_NTLE` | `cv::RETR_EXTERNAL` |
| `DITHALWANA_TŠE_BONOLO` | `cv::CHAIN_APPROX_SIMPLE` |
| `lepokisi_le_dikologilego` | `cv::boundingRect` |
| `MMALA_8BIT_3` | `CV_8UC3` |
| `bophara` | `width` |
| `bophagamo` | `height` |

## ROS 2

Headers: `#tsenya_ka_gare <ros2>` = `<rclcpp/rclcpp.hpp>`, `#tsenya_ka_gare <molaetša_wa_sengwalwa>` = `<std_msgs/msg/string.hpp>`, `#tsenya_ka_gare <molaetša_wa_palo>` = `<std_msgs/msg/int32.hpp>`, `#tsenya_ka_gare <molaetša_wa_tesimale>` = `<std_msgs/msg/float64.hpp>`, `#tsenya_ka_gare <molaetša_wa_bulini>` = `<std_msgs/msg/bool.hpp>`, `#tsenya_ka_gare <taelo_ya_lebelo>` = `<geometry_msgs/msg/twist.hpp>`, `#tsenya_ka_gare <sekene_sa_laser>` = `<sensor_msgs/msg/laser_scan.hpp>`, `#tsenya_ka_gare <seswantšho_sa_sensa>` = `<sensor_msgs/msg/image.hpp>`

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `ros` | `rclcpp` |
| `thoma_ros` | `rclcpp::init` |
| `tswalela_ros` | `rclcpp::shutdown` |
| `sepetša_ros` | `rclcpp::spin` |
| `sepetša_ros_gannyane` | `rclcpp::spin_some` |
| `ros_e_sa_phela` | `rclcpp::ok` |
| `Lefito` | `rclcpp::Node` |
| `Mophatlalatši` | `rclcpp::Publisher` |
| `Ngwadišo` | `rclcpp::Subscription` |
| `Sebadi_sa_nako` | `rclcpp::TimerBase` |
| `hlama_mophatlalatši` | `create_publisher` |
| `hlama_ngwadišo` | `create_subscription` |
| `hlama_sebadi_sa_nako` | `create_wall_timer` |
| `gaša` | `publish` |
| `mongwadi_wa_histori` | `get_logger` |
| `ROS_TSEBIŠO` | `RCLCPP_INFO` |
| `ROS_TEMOŠO` | `RCLCPP_WARN` |
| `ROS_PHOŠO` | `RCLCPP_ERROR` |
| `Sešupi` | `SharedPtr` |
| `datha` | `data` |
| `ka_go_lebanya` | `linear` |
| `go_dikologa` | `angular` |
| `bokgole` | `ranges` |
| `tsebiša_paramethara` | `declare_parameter` |
| `hwetša_paramethara` | `get_parameter` |
| `molaetša_wa_sengwalwa` | `std_msgs::msg::String` |
| `molaetša_wa_palo` | `std_msgs::msg::Int32` |
| `molaetša_wa_tesimale` | `std_msgs::msg::Float64` |
| `molaetša_wa_bulini` | `std_msgs::msg::Bool` |
| `taelo_ya_lebelo` | `geometry_msgs::msg::Twist` |
| `sekene_sa_laser` | `sensor_msgs::msg::LaserScan` |
| `seswantšho_sa_sensa` | `sensor_msgs::msg::Image` |

## Standard library extras (always on)

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `datha` | `data` |

## PyTorch (libtorch)

Headers: `#tsenya_ka_gare <go_ithuta_ga_metšhene>` = `<torch/torch.h>`

| Sepedi (Sesotho sa Leboa) | C++ |
|---|---|
| `go_ithuta_ga_metšhene` | `torch` |
| `Tensa` | `torch::Tensor` |
| `dira_tensa` | `torch::tensor` |
| `tše_tletšego_0` | `torch::zeros` |
| `tše_tletšego_1` | `torch::ones` |
| `tensa_ka_tšhoganetšo` | `torch::rand` |
| `tensa_ka_tšhoganetšo_ye_e_tlwaelegilego` | `torch::randn` |
| `bea_peu` | `torch::manual_seed` |
| `Karolo_ya_neteweke` | `torch::nn::Module` |
| `Lera_le_le_otlologilego` | `torch::nn::Linear` |
| `Lera_la_kopanyo2d` | `torch::nn::Conv2d` |
| `tsošološo_relu` | `torch::relu` |
| `logo_ya_dibaka` | `torch::log_softmax` |
| `tahlegelo_ya_sekwere` | `torch::mse_loss` |
| `tahlegelo_ya_dibaka` | `torch::nll_loss` |
| `Kaonafatši_SGD` | `torch::optim::SGD` |
| `Kaonafatši_Adam` | `torch::optim::Adam` |
| `Sedirišwa` | `torch::Device` |
| `GO_GPU` | `torch::kCUDA` |
| `GO_CPU` | `torch::kCPU` |
| `gpu_e_gona` | `torch::cuda::is_available` |
| `boloka_mmotlolo` | `torch::save` |
| `laiša_mmotlolo` | `torch::load` |
| `Mohlokomedi_wa_go_se_ithute` | `torch::NoGradGuard` |
| `ngwadiša_karolo` | `register_module` |
| `fetišetša_pele` | `forward` |
| `boela_morago` | `backward` |
| `phumola_tšekamo` | `zero_grad` |
| `tšea_kgato` | `step` |
| `iša_go` | `to` |
| `boleng_bjo_tee` | `item` |
| `lebelela_bjalo_ka` | `view` |
| `fetoša_sebopego` | `reshape` |
| `atiša_dimatriki` | `matmul` |
| `palomoka_ya_tensa` | `sum` |
| `palogare_ya_tensa` | `mean` |
| `sešupo_se_segolo` | `argmax` |
| `diparamethara` | `parameters` |
| `tlwaetša` | `train` |
| `lekola_mmotlolo` | `eval` |
