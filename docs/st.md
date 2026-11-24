# Soga: Sesotho reference

> draft - needs review by Sesotho speakers

Every word below can be used in `.st.soga` files. Plain English C++ keeps working too.

## Keywords: Control flow

| Sesotho | C++ |
|---|---|
| `haeba` | `if` |
| `ho_seng_jwalo` | `else` |
| `kgetha` | `switch` |
| `boemo` | `case` |
| `tlwaelo` | `default` |
| `ha_feela` | `while` |
| `etsa` | `do` |
| `bakeng_sa` | `for` |
| `kgaotsa` | `break` |
| `tswela_pele` | `continue` |
| `kgutlisa` | `return` |
| `tlolela` | `goto` |
| `leka` | `try` |
| `tshwara` | `catch` |
| `akgela` | `throw` |
| `co_ema` | `co_await` |
| `co_kgutlisa` | `co_return` |
| `co_hlahisa` | `co_yield` |

## Keywords: Data types

| Sesotho | C++ |
|---|---|
| `palo` | `int` |
| `desimale` | `float` |
| `desimale_habedi` | `double` |
| `tlhaku` | `char` |
| `tlhaku8` | `char8_t` |
| `tlhaku16` | `char16_t` |
| `tlhaku32` | `char32_t` |
| `tlhaku_e_pharaletseng` | `wchar_t` |
| `bulini` | `bool` |
| `lefeela` | `void` |
| `kgutshwane` | `short` |
| `telele` | `long` |
| `e_tshwayo` | `signed` |
| `e_se_nang_tshwayo` | `unsigned` |
| `ka_boiketsetso` | `auto` |
| `mofuta_wa` | `decltype` |

## Keywords: Modifiers

| Sesotho | C++ |
|---|---|
| `e_sa_fetoheng` | `const` |
| `pele_ho_nako` | `constexpr` |
| `lekola_pele` | `consteval` |
| `qala_pele` | `constinit` |
| `e_emeng` | `static` |
| `ya_kantle` | `extern` |
| `e_fetohang_kapele` | `volatile` |
| `e_fetohang` | `mutable` |
| `ka_hare` | `inline` |
| `rejisetara` | `register` |
| `ya_kgwele` | `thread_local` |
| `ka_ho_hlaka` | `explicit` |
| `ntle_le_phoso` | `noexcept` |
| `lokisa_tatellano` | `alignas` |

## Keywords: Classes, objects and structure

| Sesotho | C++ |
|---|---|
| `sehlopha` | `class` |
| `sebopeho` | `struct` |
| `kopano` | `union` |
| `lenane` | `enum` |
| `setjhaba` | `public` |
| `lekunutu` | `private` |
| `e_sirelelitsweng` | `protected` |
| `e_bonahalang` | `virtual` |
| `nkela_sebaka` | `override` |
| `ya_ho_qetela` | `final` |
| `motswalle` | `friend` |
| `sena` | `this` |
| `ncha` | `new` |
| `hlakola` | `delete` |
| `opereitara` | `operator` |
| `mohlala` | `template` |
| `mofuta` | `typename` |
| `mohopolo` | `concept` |
| `hloka` | `requires` |
| `sebaka_sa_mabitso` | `namespace` |
| `sebedisa` | `using` |
| `lebitso_le_letjha` | `typedef` |
| `romela_kantle` | `export` |
| `kenya` | `import` |
| `mojule` | `module` |
| `kopanyi` | `asm` |

## Keywords: Casts and compile-time

| Sesotho | C++ |
|---|---|
| `fetola` | `static_cast` |
| `fetola_ka_nako` | `dynamic_cast` |
| `fetola_e_sa_fetoheng` | `const_cast` |
| `fetola_ka_matla` | `reinterpret_cast` |
| `fumana_mofuta` | `typeid` |
| `boholo_ba` | `sizeof` |
| `tatellano_ya` | `alignof` |
| `netefatsa` | `static_assert` |

## Keywords: Constants

| Sesotho | C++ |
|---|---|
| `nnete` | `true` |
| `leshano` | `false` |
| `letho` | `nullptr` |

## Keywords: Word operators

| Sesotho | C++ |
|---|---|
| `le` | `and` |
| `kapa` | `or` |
| `tjhe` | `not` |
| `ha_e_lekane` | `not_eq` |
| `le_lekana` | `and_eq` |
| `kapa_lekana` | `or_eq` |
| `kapa_feela` | `xor` |
| `kapa_feela_lekana` | `xor_eq` |
| `le_bithi` | `bitand` |
| `kapa_bithi` | `bitor` |
| `fetola_bithi` | `compl` |

## Preprocessor

| Sesotho | C++ |
|---|---|
| `#kenyelletsa` | `#include` |
| `#hlalosa` | `#define` |
| `#hlakola_tlhaloso` | `#undef` |
| `#haeba` | `#if` |
| `#haeba_ho_hlalositswe` | `#ifdef` |
| `#haeba_ho_sa_hlaloswa` | `#ifndef` |
| `#kapa_haeba` | `#elif` |
| `#kapa_haeba_ho_hlalositswe` | `#elifdef` |
| `#kapa_haeba_ho_sa_hlaloswa` | `#elifndef` |
| `#ho_seng_jwalo` | `#else` |
| `#qetella_haeba` | `#endif` |
| `#mola` | `#line` |
| `#phoso` | `#error` |
| `#temoso` | `#warning` |
| `#taelo` | `#pragma` |

## Header files

| Sesotho | C++ |
|---|---|
| `<tsohle>` | `<bits/stdc++.h>` |
| `<kenyo_le_ntsho>` | `<iostream>` |
| `<mongolo>` | `<string>` |
| `<lethathamo>` | `<vector>` |
| `<mmapa>` | `<map>` |
| `<mmapa_o_sa_hlophiswang>` | `<unordered_map>` |
| `<sete>` | `<set>` |
| `<sete_e_sa_hlophiswang>` | `<unordered_set>` |
| `<mola_wa_ho_ema>` | `<queue>` |
| `<qubu>` | `<stack>` |
| `<mola_o_mabedi>` | `<deque>` |
| `<lenane_le_hokahaneng>` | `<list>` |
| `<letoto>` | `<array>` |
| `<mekgwa>` | `<algorithm>` |
| `<dipalo>` | `<cmath>` |
| `<laeborari_c>` | `<cstdlib>` |
| `<nako>` | `<ctime>` |
| `<difaele>` | `<fstream>` |
| `<molapo_wa_mongolo>` | `<sstream>` |
| `<hlophiso_ya_tlhahiso>` | `<iomanip>` |
| `<thuso>` | `<utility>` |
| `<memori>` | `<memory>` |
| `<mesebetsi>` | `<functional>` |
| `<dinomoro>` | `<numeric>` |
| `<meedi>` | `<limits>` |
| `<meedi_c>` | `<climits>` |
| `<dipalo_tsa_boholo>` | `<cstdint>` |
| `<mongolo_c>` | `<cstring>` |
| `<ditlhaku>` | `<cctype>` |
| `<nako_e_nepahetseng>` | `<chrono>` |
| `<kgwele>` | `<thread>` |
| `<senotlolo>` | `<mutex>` |
| `<kgeloho>` | `<exception>` |
| `<diphoso>` | `<stdexcept>` |
| `<motsamai>` | `<iterator>` |
| `<sehlotshwana>` | `<tuple>` |
| `<ka_boikgethelo>` | `<optional>` |
| `<ka_tsietsi>` | `<random>` |
| `<dibithi>` | `<bitset>` |

## Library: Core

| Sesotho | C++ |
|---|---|
| `ya_sehlooho` | `main` |
| `motheo` | `std` |
| `hlalositswe` | `defined` |
| `hatisa` | `printf` |
| `skena` | `scanf` |

## Library: Input / output and files

| Sesotho | C++ |
|---|---|
| `ngola` | `std::cout` |
| `bala` | `std::cin` |
| `ngola_phoso` | `std::cerr` |
| `ngola_nalane` | `std::clog` |
| `mola_o_motjha` | `std::endl` |
| `bala_mola` | `std::getline` |
| `qhala` | `std::flush` |
| `didesimale_tse_tsitsitseng` | `std::fixed` |
| `beha_nepahalo` | `std::setprecision` |
| `beha_bophara` | `std::setw` |
| `faele_ya_ho_bala` | `std::ifstream` |
| `faele_ya_ho_ngola` | `std::ofstream` |
| `faele` | `std::fstream` |
| `molapo_wa_mongolo` | `std::stringstream` |
| `molapo_wa_ho_bala` | `std::istringstream` |
| `molapo_wa_ho_ngola` | `std::ostringstream` |

## Library: Data types

| Sesotho | C++ |
|---|---|
| `palo_ya_boholo` | `std::size_t` |
| `palo8` | `std::int8_t` |
| `palo16` | `std::int16_t` |
| `palo32` | `std::int32_t` |
| `palo64` | `std::int64_t` |
| `palo_u8` | `std::uint8_t` |
| `palo_u16` | `std::uint16_t` |
| `palo_u32` | `std::uint32_t` |
| `palo_u64` | `std::uint64_t` |

## Library: Containers (STL)

| Sesotho | C++ |
|---|---|
| `mongolo` | `std::string` |
| `lethathamo` | `std::vector` |
| `mmapa` | `std::map` |
| `mmapa_o_sa_hlophiswang` | `std::unordered_map` |
| `mmapa_o_mongata` | `std::multimap` |
| `sete` | `std::set` |
| `sete_e_sa_hlophiswang` | `std::unordered_set` |
| `sete_e_ngata` | `std::multiset` |
| `mola_wa_ho_ema` | `std::queue` |
| `mola_wa_bohlokwa` | `std::priority_queue` |
| `qubu` | `std::stack` |
| `mola_o_mabedi` | `std::deque` |
| `lenane_le_hokahaneng` | `std::list` |
| `letoto` | `std::array` |
| `para` | `std::pair` |
| `sehlotshwana` | `std::tuple` |
| `dibithi` | `std::bitset` |
| `ka_boikgethelo` | `std::optional` |
| `etsa_para` | `std::make_pair` |
| `etsa_sehlotshwana` | `std::make_tuple` |
| `nka` | `std::get` |
| `tlama` | `std::tie` |
| `suthisa` | `std::move` |

## Library: Smart pointers

| Sesotho | C++ |
|---|---|
| `sesupa_se_le_seng` | `std::unique_ptr` |
| `sesupa_se_arolelanwang` | `std::shared_ptr` |
| `sesupa_se_fokolang` | `std::weak_ptr` |
| `etsa_se_le_seng` | `std::make_unique` |
| `etsa_se_arolelanwang` | `std::make_shared` |

## Library: Algorithms

| Sesotho | C++ |
|---|---|
| `hlophisa` | `std::sort` |
| `kgutlisetsa_morao` | `std::reverse` |
| `fumana` | `std::find` |
| `bala_palo` | `std::count` |
| `e_kgolo` | `std::max` |
| `e_nyane` | `std::min` |
| `ntho_e_kgolo` | `std::max_element` |
| `ntho_e_nyane` | `std::min_element` |
| `bokella_kakaretso` | `std::accumulate` |
| `batla_habedi` | `std::binary_search` |
| `moedi_o_tlase` | `std::lower_bound` |
| `moedi_o_hodimo` | `std::upper_bound` |
| `tlatsa` | `std::fill` |
| `kopitsa` | `std::copy` |
| `fetola_tsohle` | `std::transform` |
| `ka_nngwe_le_nngwe` | `std::for_each` |
| `tlosa_tse_ipheteng` | `std::unique` |
| `tatellano_e_latelang` | `std::next_permutation` |
| `fapanya` | `std::swap` |
| `latellanya` | `std::iota` |

## Library: Math

| Sesotho | C++ |
|---|---|
| `boleng_bo_feletseng` | `std::abs` |
| `motso` | `std::sqrt` |
| `matla` | `std::pow` |
| `nyolla` | `std::ceil` |
| `theola` | `std::floor` |
| `atametsa` | `std::round` |
| `saene` | `std::sin` |
| `khosaene` | `std::cos` |
| `tenjente` | `std::tan` |
| `logo` | `std::log` |
| `logo10` | `std::log10` |
| `eksponente` | `std::exp` |
| `haepothenuse` | `std::hypot` |
| `masalla` | `std::fmod` |
| `karolo_e_kgolo` | `std::gcd` |
| `palo_e_nyane_e_tshwanang` | `std::lcm` |
| `meedi_ya_dipalo` | `std::numeric_limits` |
| `ka_tsietsi` | `std::rand` |
| `jala_tsietsi` | `std::srand` |
| `nako` | `std::time` |

## Library: Strings and characters

| Sesotho | C++ |
|---|---|
| `ho_mongolo` | `std::to_string` |
| `ho_palo` | `std::stoi` |
| `ho_palo_e_telele` | `std::stol` |
| `ho_desimale` | `std::stod` |
| `ho_tlhaku_e_kgolo` | `std::toupper` |
| `ho_tlhaku_e_nyane` | `std::tolower` |
| `ke_nomoro` | `std::isdigit` |
| `ke_tlhaku` | `std::isalpha` |
| `ke_sebaka` | `std::isspace` |
| `ke_e_kgolo` | `std::isupper` |
| `ke_e_nyane` | `std::islower` |

## Library: Exceptions

| Sesotho | C++ |
|---|---|
| `kgeloho` | `std::exception` |
| `phoso_ya_tshebetso` | `std::runtime_error` |
| `phoso_ya_monahano` | `std::logic_error` |
| `kantle_ho_moedi` | `std::out_of_range` |
| `kganetso_e_fosahetseng` | `std::invalid_argument` |

## Library: Threads

| Sesotho | C++ |
|---|---|
| `kgwele` | `std::thread` |
| `senotlolo` | `std::mutex` |
| `molebedi_wa_senotlolo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| Sesotho | C++ |
|---|---|
| `boholo` | `size` |
| `bolelele` | `length` |
| `ha_ho_letho` | `empty` |
| `eketsa_qetellong` | `push_back` |
| `tlosa_qetellong` | `pop_back` |
| `eketsa_qalong` | `push_front` |
| `tlosa_qalong` | `pop_front` |
| `beha` | `emplace` |
| `beha_qetellong` | `emplace_back` |
| `eketsa` | `push` |
| `ntsha` | `pop` |
| `hodimo` | `top` |
| `pele` | `front` |
| `morao` | `back` |
| `qalo` | `begin` |
| `qetello` | `end` |
| `qalo_morao` | `rbegin` |
| `qetello_morao` | `rend` |
| `hlakola_tsohle` | `clear` |
| `kenya_hara` | `insert` |
| `phumola` | `erase` |
| `sebakeng` | `at` |
| `karolo` | `substr` |
| `kgomaretsa` | `append` |
| `mongolo_c` | `c_str` |
| `bapisa` | `compare` |
| `nkela_sebaka_ka` | `replace` |
| `fetola_boholo` | `resize` |
| `boloka_sebaka` | `reserve` |
| `bokgoni` | `capacity` |
| `ya_pele` | `first` |
| `ya_bobedi` | `second` |
| `ke_eng` | `what` |
| `bula` | `open` |
| `kwala` | `close` |
| `e_butswe` | `is_open` |
| `qetello_ya_faele` | `eof` |
| `mongolo_kaofela` | `str` |
| `beha_botjha` | `reset` |
| `lokolla` | `release` |
| `kopanya` | `join` |
| `arola` | `detach` |
| `notlela` | `lock` |
| `notlolla` | `unlock` |

## Library: Arduino / robots

| Sesotho | C++ |
|---|---|
| `qala` | `setup` |
| `pheta_pheta` | `loop` |
| `beha_phini` | `pinMode` |
| `ngola_dijithale` | `digitalWrite` |
| `bala_dijithale` | `digitalRead` |
| `bala_analoko` | `analogRead` |
| `ngola_analoko` | `analogWrite` |
| `ema` | `delay` |
| `ema_maekhro` | `delayMicroseconds` |
| `dimilisekonde` | `millis` |
| `dimaekhrosekonde` | `micros` |
| `thibela` | `constrain` |
| `molumo` | `tone` |
| `emisa_molumo` | `noTone` |
| `hokela_tshitiso` | `attachInterrupt` |
| `HODIMO` | `HIGH` |
| `TLASE` | `LOW` |
| `TSE_TSWANG` | `OUTPUT` |
| `TSE_KENANG` | `INPUT` |
| `TSE_KENANG_HO_HULA` | `INPUT_PULLUP` |
| `LED_E_KAHARE` | `LED_BUILTIN` |
| `Seriale` | `Serial` |
| `bontsha` | `print` |
| `bontsha_mola` | `println` |
| `e_fumanehang` | `available` |
| `bala_baete` | `read` |
| `ngola_baete` | `write` |

# Library packs

A pack switches on when you include one of its headers (in your language or in English).

## Arduino libraries

Headers: `#kenyelletsa <servo>` = `<Servo.h>`, `#kenyelletsa <terata>` = `<Wire.h>`, `#kenyelletsa <bese_ya_spi>` = `<SPI.h>`, `#kenyelletsa <memori_e_dulang>` = `<EEPROM.h>`

| Sesotho | C++ |
|---|---|
| `Seservo` | `Servo` |
| `hokela` | `attach` |
| `ngola_dimaekhrosekonde` | `writeMicroseconds` |
| `Terata` | `Wire` |
| `qala_ho_romela` | `beginTransmission` |
| `qetela_ho_romela` | `endTransmission` |
| `kopa_ho` | `requestFrom` |
| `ha_ho_amohelwa` | `onReceive` |
| `ha_ho_kopuwa` | `onRequest` |
| `Bese_ya_spi` | `SPI` |
| `fetisetsa` | `transfer` |
| `Memori_e_dulang` | `EEPROM` |
| `kenya_ho_yona` | `put` |
| `ntjhafatsa` | `update` |

## Arduino (always on)

| Sesotho | C++ |
|---|---|
| `kgetha_ka_tsietsi` | `random` |
| `peo_ya_tsietsi` | `randomSeed` |
| `lekanya_botjha` | `map` |
| `lekanya_phalese` | `pulseIn` |
| `phini_ho_tshitiso` | `digitalPinToInterrupt` |
| `HA_E_NYOLOHA` | `RISING` |
| `HA_E_THEOHA` | `FALLING` |
| `HA_E_FETOHA` | `CHANGE` |
| `dumella_ditshitiso` | `interrupts` |
| `thibela_ditshitiso` | `noInterrupts` |
| `bala_nomoro` | `parseInt` |
| `bala_desimale` | `parseFloat` |
| `bala_mongolo` | `readString` |
| `bala_mongolo_ho_fihlela` | `readStringUntil` |
| `e_be_palo` | `toInt` |
| `e_be_desimale` | `toFloat` |
| `sebaka_sa` | `indexOf` |
| `karolo_ya_mongolo` | `substring` |
| `kuta_dibaka` | `trim` |
| `e_be_ditlhaku_tse_kgolo` | `toUpperCase` |
| `e_be_ditlhaku_tse_nyane` | `toLowerCase` |
| `e_qala_ka` | `startsWith` |
| `e_fela_ka` | `endsWith` |

## CUDA

Headers: `#kenyelletsa <gpu>` = `<cuda_runtime.h>`

| Sesotho | C++ |
|---|---|
| `mosebetsi_wa_gpu` | `__global__` |
| `ya_gpu` | `__device__` |
| `ya_khomphutha` | `__host__` |
| `e_arolelanwang_gpu` | `__shared__` |
| `lekanya_dikgwele` | `__syncthreads` |
| `palo_ya_kgwele` | `threadIdx` |
| `palo_ya_boloko` | `blockIdx` |
| `boholo_ba_boloko` | `blockDim` |
| `boholo_ba_gridi` | `gridDim` |
| `boholo3` | `dim3` |
| `gpu_abela_memori` | `cudaMalloc` |
| `gpu_lokolla_memori` | `cudaFree` |
| `gpu_kopitsa_memori` | `cudaMemcpy` |
| `HO_TSWA_KHOMPHUTHA_HO_GPU` | `cudaMemcpyHostToDevice` |
| `HO_TSWA_GPU_HO_KHOMPHUTHA` | `cudaMemcpyDeviceToHost` |
| `gpu_ema_e_qete` | `cudaDeviceSynchronize` |
| `gpu_phoso_ya_ho_qetela` | `cudaGetLastError` |
| `gpu_mongolo_wa_phoso` | `cudaGetErrorString` |
| `Phoso_ya_gpu` | `cudaError_t` |
| `GPU_E_ATLEHILE` | `cudaSuccess` |

## Eigen

Headers: `#kenyelletsa <dimatriki>` = `<Eigen/Dense>`, `#kenyelletsa <dimatriki_motheo>` = `<Eigen/Core>`, `#kenyelletsa <jeometri>` = `<Eigen/Geometry>`

| Sesotho | C++ |
|---|---|
| `dimatriki` | `Eigen` |
| `Matriki` | `Eigen::MatrixXd` |
| `Vekthara` | `Eigen::VectorXd` |
| `Matriki3` | `Eigen::Matrix3d` |
| `Matriki4` | `Eigen::Matrix4d` |
| `Vekthara3` | `Eigen::Vector3d` |
| `Matriki_ya_mofuta` | `Eigen::Matrix` |
| `Kwatheniono` | `Eigen::Quaterniond` |
| `Khutlo_le_ekese` | `Eigen::AngleAxisd` |
| `Bonngwe` | `Identity` |
| `Ziro` | `Zero` |
| `Kaofela_ke_nngwe` | `Ones` |
| `Ka_tsietsi` | `Random` |
| `fetola_matriki` | `transpose` |
| `e_fapaneng` | `inverse` |
| `qeto` | `determinant` |
| `bolelele_ba_vekthara` | `norm` |
| `e_lekantswe` | `normalized` |
| `sehlahiswa_sa_ntlha` | `dot` |
| `sehlahiswa_sa_sefapano` | `cross` |
| `rarolla` | `solve` |
| `arola_qr` | `colPivHouseholderQr` |
| `di_batla_di_lekana` | `isApprox` |
| `Ekese_X` | `UnitX` |
| `Ekese_Y` | `UnitY` |
| `Ekese_Z` | `UnitZ` |
| `e_be_matriki` | `matrix` |

## OpenCV

Headers: `#kenyelletsa <pono>` = `<opencv2/opencv.hpp>`, `#kenyelletsa <pono_motheo>` = `<opencv2/core.hpp>`, `#kenyelletsa <pono_ditshwantsho>` = `<opencv2/imgproc.hpp>`, `#kenyelletsa <pono_difensetere>` = `<opencv2/highgui.hpp>`, `#kenyelletsa <pono_video>` = `<opencv2/videoio.hpp>`, `#kenyelletsa <pono_ho_fumana_dintho>` = `<opencv2/objdetect.hpp>`

| Sesotho | C++ |
|---|---|
| `pono` | `cv` |
| `Setshwantsho` | `cv::Mat` |
| `bala_setshwantsho` | `cv::imread` |
| `boloka_setshwantsho` | `cv::imwrite` |
| `bontsha_setshwantsho` | `cv::imshow` |
| `ema_konopo` | `cv::waitKey` |
| `theha_fensetere` | `cv::namedWindow` |
| `kwala_difensetere_tsohle` | `cv::destroyAllWindows` |
| `fetola_mmala` | `cv::cvtColor` |
| `MMALA_HO_PUTSWA` | `cv::COLOR_BGR2GRAY` |
| `MMALA_HO_HSV` | `cv::COLOR_BGR2HSV` |
| `MMALA_HO_RGB` | `cv::COLOR_BGR2RGB` |
| `fifatsa` | `cv::GaussianBlur` |
| `fumana_mathoko` | `cv::Canny` |
| `moedi_wa_karohano` | `cv::threshold` |
| `MOEDI_O_MABEDI` | `cv::THRESH_BINARY` |
| `fetola_boholo_ba_setshwantsho` | `cv::resize` |
| `taka_kgutlonne` | `cv::rectangle` |
| `taka_sedikadikwe` | `cv::circle` |
| `taka_mola` | `cv::line` |
| `ngola_setshwantshong` | `cv::putText` |
| `Ntlha` | `cv::Point` |
| `Bophara_le_bolelele` | `cv::Size` |
| `Boleng_ba_mmala` | `cv::Scalar` |
| `Sebakana` | `cv::Rect` |
| `Khamera` | `cv::VideoCapture` |
| `e_bulehile` | `isOpened` |
| `mela` | `rows` |
| `dikholomo` | `cols` |
| `dikanale` | `channels` |
| `etsa_kopi` | `clone` |
| `kopitsetsa_ho` | `copyTo` |
| `fumana_meralo` | `cv::findContours` |
| `taka_meralo` | `cv::drawContours` |
| `sebaka_sa_moralo` | `cv::contourArea` |
| `ka_hare_ho_moedi` | `cv::inRange` |
| `Mokgethi` | `cv::CascadeClassifier` |
| `fumana_dintho` | `detectMultiScale` |
| `jara` | `load` |
| `BALA_KA_MMALA` | `cv::IMREAD_COLOR` |
| `BALA_KA_PUTSWA` | `cv::IMREAD_GRAYSCALE` |
| `FONTO_E_BONOLO` | `cv::FONT_HERSHEY_SIMPLEX` |
| `Phikisele` | `cv::Vec3b` |
| `tse_tletseng_0` | `zeros` |
| `tse_tletseng_1` | `ones` |
| `MERALO_YA_KANTLE` | `cv::RETR_EXTERNAL` |
| `MERALO_E_BONOLO` | `cv::CHAIN_APPROX_SIMPLE` |
| `lebokose_le_potolohileng` | `cv::boundingRect` |
| `MMALA_8BIT_3` | `CV_8UC3` |
| `bophara` | `width` |
| `bophahamo` | `height` |

## ROS 2

Headers: `#kenyelletsa <ros2>` = `<rclcpp/rclcpp.hpp>`, `#kenyelletsa <molaetsa_wa_mongolo>` = `<std_msgs/msg/string.hpp>`, `#kenyelletsa <molaetsa_wa_palo>` = `<std_msgs/msg/int32.hpp>`, `#kenyelletsa <molaetsa_wa_desimale>` = `<std_msgs/msg/float64.hpp>`, `#kenyelletsa <molaetsa_wa_bulini>` = `<std_msgs/msg/bool.hpp>`, `#kenyelletsa <taelo_ya_lebelo>` = `<geometry_msgs/msg/twist.hpp>`, `#kenyelletsa <sekene_sa_laser>` = `<sensor_msgs/msg/laser_scan.hpp>`, `#kenyelletsa <setshwantsho_sa_sensa>` = `<sensor_msgs/msg/image.hpp>`

| Sesotho | C++ |
|---|---|
| `ros` | `rclcpp` |
| `qala_ros` | `rclcpp::init` |
| `kwala_ros` | `rclcpp::shutdown` |
| `matha_ros` | `rclcpp::spin` |
| `matha_ros_hanyane` | `rclcpp::spin_some` |
| `ros_e_ntse_e_phela` | `rclcpp::ok` |
| `Lefito` | `rclcpp::Node` |
| `Mophatlalatsi` | `rclcpp::Publisher` |
| `Ngodiso` | `rclcpp::Subscription` |
| `Sebadi_sa_nako` | `rclcpp::TimerBase` |
| `theha_mophatlalatsi` | `create_publisher` |
| `theha_ngodiso` | `create_subscription` |
| `theha_sebadi_sa_nako` | `create_wall_timer` |
| `phatlalatsa` | `publish` |
| `mongodi_wa_nalane` | `get_logger` |
| `ROS_TSEBO` | `RCLCPP_INFO` |
| `ROS_TEMOSO` | `RCLCPP_WARN` |
| `ROS_PHOSO` | `RCLCPP_ERROR` |
| `Sesupa` | `SharedPtr` |
| `datha` | `data` |
| `ka_kotloloho` | `linear` |
| `ho_potoloha` | `angular` |
| `bohole` | `ranges` |
| `phatlalatsa_paramethara` | `declare_parameter` |
| `fumana_paramethara` | `get_parameter` |
| `molaetsa_wa_mongolo` | `std_msgs::msg::String` |
| `molaetsa_wa_palo` | `std_msgs::msg::Int32` |
| `molaetsa_wa_desimale` | `std_msgs::msg::Float64` |
| `molaetsa_wa_bulini` | `std_msgs::msg::Bool` |
| `taelo_ya_lebelo` | `geometry_msgs::msg::Twist` |
| `sekene_sa_laser` | `sensor_msgs::msg::LaserScan` |
| `setshwantsho_sa_sensa` | `sensor_msgs::msg::Image` |

## Standard library extras (always on)

| Sesotho | C++ |
|---|---|
| `datha` | `data` |

## PyTorch (libtorch)

Headers: `#kenyelletsa <thuto_ya_metjhini>` = `<torch/torch.h>`

| Sesotho | C++ |
|---|---|
| `thuto_ya_metjhini` | `torch` |
| `Tensa` | `torch::Tensor` |
| `etsa_tensa` | `torch::tensor` |
| `tse_tletseng_0` | `torch::zeros` |
| `tse_tletseng_1` | `torch::ones` |
| `tensa_ka_tsietsi` | `torch::rand` |
| `tensa_ka_tsietsi_e_tlwaelehileng` | `torch::randn` |
| `beha_peo` | `torch::manual_seed` |
| `Karolo_ya_neteweke` | `torch::nn::Module` |
| `Lera_le_otlolohileng` | `torch::nn::Linear` |
| `Lera_la_kopanyo2d` | `torch::nn::Conv2d` |
| `tsosoloso_relu` | `torch::relu` |
| `logo_ya_menyetla` | `torch::log_softmax` |
| `tahlehelo_ya_sekwere` | `torch::mse_loss` |
| `tahlehelo_ya_menyetla` | `torch::nll_loss` |
| `Ntlafatsi_SGD` | `torch::optim::SGD` |
| `Ntlafatsi_Adam` | `torch::optim::Adam` |
| `Sesebediswa` | `torch::Device` |
| `HO_GPU` | `torch::kCUDA` |
| `HO_CPU` | `torch::kCPU` |
| `gpu_e_teng` | `torch::cuda::is_available` |
| `boloka_motlolo` | `torch::save` |
| `jara_motlolo` | `torch::load` |
| `Molebedi_ya_sa_ithuteng` | `torch::NoGradGuard` |
| `ngodisa_karolo` | `register_module` |
| `fetisetsa_pele` | `forward` |
| `kgutlela_morao` | `backward` |
| `hlakola_lethebeke` | `zero_grad` |
| `nka_mohato` | `step` |
| `isa_ho` | `to` |
| `boleng_bo_le_bong` | `item` |
| `sheba_jwalo_ka` | `view` |
| `fetola_sebopeho` | `reshape` |
| `atisa_dimatriki` | `matmul` |
| `kakaretso_ya_tensa` | `sum` |
| `karolelano_ya_tensa` | `mean` |
| `sesupo_se_seholo` | `argmax` |
| `diparamethara` | `parameters` |
| `koetlisa` | `train` |
| `lekola_motlolo` | `eval` |
