# Soga: Xitsonga reference

> draft - needs review by Xitsonga speakers

Every word below can be used in `.ts.soga` files. Plain English C++ keeps working too.

## Keywords: Control flow

| Xitsonga | C++ |
|---|---|
| `loko` | `if` |
| `ku_nga_ri_tano` | `else` |
| `hlawula` | `switch` |
| `xiyimo` | `case` |
| `ntolovelo` | `default` |
| `ntsena_loko` | `while` |
| `endla` | `do` |
| `rhendzeleka` | `for` |
| `yimisa` | `break` |
| `yisa_emahlweni` | `continue` |
| `vuyisa` | `return` |
| `tlulela` | `goto` |
| `ringeta` | `try` |
| `khoma` | `catch` |
| `hoxa` | `throw` |
| `co_rindza` | `co_await` |
| `co_vuyisa` | `co_return` |
| `co_humesa` | `co_yield` |

## Keywords: Data types

| Xitsonga | C++ |
|---|---|
| `nomboro` | `int` |
| `desimali` | `float` |
| `desimali_mbirhi` | `double` |
| `letere` | `char` |
| `letere8` | `char8_t` |
| `letere16` | `char16_t` |
| `letere32` | `char32_t` |
| `letere_ra_anama` | `wchar_t` |
| `buliyani` | `bool` |
| `swi_hava` | `void` |
| `komu` | `short` |
| `leha` | `long` |
| `na_mfungho` | `signed` |
| `handle_ka_mfungho` | `unsigned` |
| `hi_ku_tiendlekela` | `auto` |
| `muxaka_wa` | `decltype` |

## Keywords: Modifiers

| Xitsonga | C++ |
|---|---|
| `lexi_nga_cinciki` | `const` |
| `ka_ha_ri_emahlweni` | `constexpr` |
| `kambela_ka_ha_ri_emahlweni` | `consteval` |
| `sungula_ka_ha_ri_emahlweni` | `constinit` |
| `lexi_yimeke` | `static` |
| `xa_le_handle` | `extern` |
| `lexi_cincaka_hi_ku_hatlisa` | `volatile` |
| `lexi_cincaka` | `mutable` |
| `endzeni` | `inline` |
| `rejisitara` | `register` |
| `xa_ntambu` | `thread_local` |
| `hi_ku_kongoma` | `explicit` |
| `handle_ka_xihoxo` | `noexcept` |
| `ringanisa` | `alignas` |

## Keywords: Classes, objects and structure

| Xitsonga | C++ |
|---|---|
| `ntlawa` | `class` |
| `xivumbeko` | `struct` |
| `nhlangano` | `union` |
| `nxaxamelo` | `enum` |
| `xa_vanhu` | `public` |
| `xihundla` | `private` |
| `lexi_sirhelelekeke` | `protected` |
| `lexi_vonakaka` | `virtual` |
| `teka_ndhawu` | `override` |
| `xo_hetelela` | `final` |
| `munghana` | `friend` |
| `leswi` | `this` |
| `lexintshwa` | `new` |
| `susa` | `delete` |
| `opareta` | `operator` |
| `xikombiso` | `template` |
| `muxaka` | `typename` |
| `mianakanyo` | `concept` |
| `lava` | `requires` |
| `ndhawu_ya_mavito` | `namespace` |
| `tirhisa` | `using` |
| `vito_lerintshwa` | `typedef` |
| `rhumela_ehandle` | `export` |
| `nghenisa` | `import` |
| `mojulu` | `module` |
| `muhlanganisi` | `asm` |

## Keywords: Casts and compile-time

| Xitsonga | C++ |
|---|---|
| `cinca` | `static_cast` |
| `cinca_hi_nkarhi` | `dynamic_cast` |
| `cinca_lexi_nga_cinciki` | `const_cast` |
| `cinca_hi_matimba` | `reinterpret_cast` |
| `kuma_muxaka` | `typeid` |
| `vukulu_bya` | `sizeof` |
| `ku_ringana_ka` | `alignof` |
| `tiyisisa` | `static_assert` |

## Keywords: Constants

| Xitsonga | C++ |
|---|---|
| `ntiyiso` | `true` |
| `mavunwa` | `false` |
| `hava_nchumu` | `nullptr` |

## Keywords: Word operators

| Xitsonga | C++ |
|---|---|
| `na` | `and` |
| `kumbe` | `or` |
| `a_hi_swona` | `not` |
| `a_swi_ringani` | `not_eq` |
| `na_ringana` | `and_eq` |
| `kumbe_ringana` | `or_eq` |
| `kumbe_ntsena` | `xor` |
| `kumbe_ntsena_ringana` | `xor_eq` |
| `na_bithi` | `bitand` |
| `kumbe_bithi` | `bitor` |
| `cinca_bithi` | `compl` |

## Preprocessor

| Xitsonga | C++ |
|---|---|
| `#katsa` | `#include` |
| `#hlamusela` | `#define` |
| `#susa_nhlamuselo` | `#undef` |
| `#loko` | `#if` |
| `#loko_swi_hlamuseriwile` | `#ifdef` |
| `#loko_swi_nga_hlamuseriwanga` | `#ifndef` |
| `#kumbe_loko` | `#elif` |
| `#kumbe_loko_swi_hlamuseriwile` | `#elifdef` |
| `#kumbe_loko_swi_nga_hlamuseriwanga` | `#elifndef` |
| `#ku_nga_ri_tano` | `#else` |
| `#hetisa_loko` | `#endif` |
| `#layini` | `#line` |
| `#xihoxo` | `#error` |
| `#xitsundzuxo` | `#warning` |
| `#xileriso` | `#pragma` |

## Header files

| Xitsonga | C++ |
|---|---|
| `<hinkwaswo>` | `<bits/stdc++.h>` |
| `<ku_nghena_ni_ku_huma>` | `<iostream>` |
| `<matsalwa>` | `<string>` |
| `<ntlhanganelo>` | `<vector>` |
| `<mepe>` | `<map>` |
| `<mepe_wo_ka_hlelo>` | `<unordered_map>` |
| `<sete>` | `<set>` |
| `<sete_yo_ka_hlelo>` | `<unordered_set>` |
| `<layini_yo_rindza>` | `<queue>` |
| `<mulwalo>` | `<stack>` |
| `<layini_ya_matlhelo_mambirhi>` | `<deque>` |
| `<nxaxamelo_lowu_hlanganisiweke>` | `<list>` |
| `<ntlhandlamano>` | `<array>` |
| `<maendlelo>` | `<algorithm>` |
| `<tinhlayo>` | `<cmath>` |
| `<layiburari_c>` | `<cstdlib>` |
| `<nkarhi>` | `<ctime>` |
| `<tifayili>` | `<fstream>` |
| `<nambu_wa_matsalwa>` | `<sstream>` |
| `<ku_hlela_vuhumelerisi>` | `<iomanip>` |
| `<mpfuno>` | `<utility>` |
| `<memori>` | `<memory>` |
| `<mintirho>` | `<functional>` |
| `<tinomboro>` | `<numeric>` |
| `<mindzilakano>` | `<limits>` |
| `<mindzilakano_c>` | `<climits>` |
| `<tinomboro_ta_vukulu>` | `<cstdint>` |
| `<matsalwa_c>` | `<cstring>` |
| `<maletere>` | `<cctype>` |
| `<nkarhi_wo_kongoma>` | `<chrono>` |
| `<ntambu>` | `<thread>` |
| `<xilotlelo>` | `<mutex>` |
| `<xihlamariso>` | `<exception>` |
| `<swihoxo>` | `<stdexcept>` |
| `<mufambi>` | `<iterator>` |
| `<ntlawana>` | `<tuple>` |
| `<hi_ku_hlawula>` | `<optional>` |
| `<hi_ku_tshuka>` | `<random>` |
| `<tibithi>` | `<bitset>` |

## Library: Core

| Xitsonga | C++ |
|---|---|
| `nkulu` | `main` |
| `masungulo` | `std` |
| `hlamuseriwile` | `defined` |
| `gandlisa` | `printf` |
| `sekena` | `scanf` |

## Library: Input / output and files

| Xitsonga | C++ |
|---|---|
| `tsala` | `std::cout` |
| `hlaya` | `std::cin` |
| `tsala_xihoxo` | `std::cerr` |
| `tsala_matimu` | `std::clog` |
| `layini_leyintshwa` | `std::endl` |
| `hlaya_layini` | `std::getline` |
| `phatlalatsa` | `std::flush` |
| `tidesimali_leti_tiyeke` | `std::fixed` |
| `veka_ku_kongoma` | `std::setprecision` |
| `veka_vuanami` | `std::setw` |
| `fayili_yo_hlaya` | `std::ifstream` |
| `fayili_yo_tsala` | `std::ofstream` |
| `fayili` | `std::fstream` |
| `nambu_wa_matsalwa` | `std::stringstream` |
| `nambu_wo_hlaya` | `std::istringstream` |
| `nambu_wo_tsala` | `std::ostringstream` |

## Library: Data types

| Xitsonga | C++ |
|---|---|
| `nomboro_ya_vukulu` | `std::size_t` |
| `nomboro8` | `std::int8_t` |
| `nomboro16` | `std::int16_t` |
| `nomboro32` | `std::int32_t` |
| `nomboro64` | `std::int64_t` |
| `nomboro_u8` | `std::uint8_t` |
| `nomboro_u16` | `std::uint16_t` |
| `nomboro_u32` | `std::uint32_t` |
| `nomboro_u64` | `std::uint64_t` |

## Library: Containers (STL)

| Xitsonga | C++ |
|---|---|
| `matsalwa` | `std::string` |
| `ntlhanganelo` | `std::vector` |
| `mepe` | `std::map` |
| `mepe_wo_ka_hlelo` | `std::unordered_map` |
| `mepe_wo_tala` | `std::multimap` |
| `sete` | `std::set` |
| `sete_yo_ka_hlelo` | `std::unordered_set` |
| `sete_yo_tala` | `std::multiset` |
| `layini_yo_rindza` | `std::queue` |
| `layini_ya_nkoka` | `std::priority_queue` |
| `mulwalo` | `std::stack` |
| `layini_ya_matlhelo_mambirhi` | `std::deque` |
| `nxaxamelo_lowu_hlanganisiweke` | `std::list` |
| `ntlhandlamano` | `std::array` |
| `mpatswa` | `std::pair` |
| `ntlawana` | `std::tuple` |
| `tibithi` | `std::bitset` |
| `hi_ku_hlawula` | `std::optional` |
| `endla_mpatswa` | `std::make_pair` |
| `endla_ntlawana` | `std::make_tuple` |
| `teka` | `std::get` |
| `boha` | `std::tie` |
| `rhurhisa` | `std::move` |

## Library: Smart pointers

| Xitsonga | C++ |
|---|---|
| `xikombi_xinwe` | `std::unique_ptr` |
| `xikombi_lexi_avelaniwaka` | `std::shared_ptr` |
| `xikombi_lexi_tsaneke` | `std::weak_ptr` |
| `endla_xinwe` | `std::make_unique` |
| `endla_lexi_avelaniwaka` | `std::make_shared` |

## Library: Algorithms

| Xitsonga | C++ |
|---|---|
| `hlela` | `std::sort` |
| `vuyela_endzhaku` | `std::reverse` |
| `kuma` | `std::find` |
| `hlayela` | `std::count` |
| `lexikulu` | `std::max` |
| `lexitsongo` | `std::min` |
| `nchumu_lowukulu` | `std::max_element` |
| `nchumu_lowutsongo` | `std::min_element` |
| `hlengeleta_ntsengo` | `std::accumulate` |
| `lavisisa_kambirhi` | `std::binary_search` |
| `ndzilakano_wa_le_hansi` | `std::lower_bound` |
| `ndzilakano_wa_le_henhla` | `std::upper_bound` |
| `tata` | `std::fill` |
| `kopa` | `std::copy` |
| `cinca_hinkwaswo` | `std::transform` |
| `xinwe_ni_xinwe` | `std::for_each` |
| `susa_leswi_phindhiweke` | `std::unique` |
| `nxaxameto_lowu_landzelaka` | `std::next_permutation` |
| `cincana` | `std::swap` |
| `landzelelanisa` | `std::iota` |

## Library: Math

| Xitsonga | C++ |
|---|---|
| `nkoka_lowu_heleleke` | `std::abs` |
| `rimitsu` | `std::sqrt` |
| `matimba` | `std::pow` |
| `tlakusa` | `std::ceil` |
| `xikisa` | `std::floor` |
| `tshinelela` | `std::round` |
| `sayini` | `std::sin` |
| `khosayini` | `std::cos` |
| `thenjenti` | `std::tan` |
| `logo` | `std::log` |
| `logo10` | `std::log10` |
| `ekisiponente` | `std::exp` |
| `hayiphothenyusi` | `std::hypot` |
| `nsalelo` | `std::fmod` |
| `muavanyisi_lonkulu` | `std::gcd` |
| `nkokoveto_lowutsongo` | `std::lcm` |
| `mindzilakano_ya_tinomboro` | `std::numeric_limits` |
| `hi_ku_tshuka` | `std::rand` |
| `byala_ku_tshuka` | `std::srand` |
| `nkarhi` | `std::time` |

## Library: Strings and characters

| Xitsonga | C++ |
|---|---|
| `eka_matsalwa` | `std::to_string` |
| `eka_nomboro` | `std::stoi` |
| `eka_nomboro_yo_leha` | `std::stol` |
| `eka_desimali` | `std::stod` |
| `eka_letere_lerikulu` | `std::toupper` |
| `eka_letere_lerintsongo` | `std::tolower` |
| `i_diyijiti` | `std::isdigit` |
| `i_letere` | `std::isalpha` |
| `i_ndhawu_yo_pfumala` | `std::isspace` |
| `i_lerikulu` | `std::isupper` |
| `i_lerintsongo` | `std::islower` |

## Library: Exceptions

| Xitsonga | C++ |
|---|---|
| `xihlamariso` | `std::exception` |
| `xihoxo_xa_ntirho` | `std::runtime_error` |
| `xihoxo_xa_mianakanyo` | `std::logic_error` |
| `ehandle_ka_ndzilakano` | `std::out_of_range` |
| `nhlamuselo_leyi_hoxeke` | `std::invalid_argument` |

## Library: Threads

| Xitsonga | C++ |
|---|---|
| `ntambu` | `std::thread` |
| `xilotlelo` | `std::mutex` |
| `murindzi_wa_xilotlelo` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| Xitsonga | C++ |
|---|---|
| `vukulu` | `size` |
| `ku_leha` | `length` |
| `a_ku_na_nchumu` | `empty` |
| `engetela_emakumu` | `push_back` |
| `susa_emakumu` | `pop_back` |
| `engetela_eku_sunguleni` | `push_front` |
| `susa_eku_sunguleni` | `pop_front` |
| `veka` | `emplace` |
| `veka_emakumu` | `emplace_back` |
| `engetela` | `push` |
| `humesa` | `pop` |
| `ehenhla` | `top` |
| `emahlweni` | `front` |
| `endzhaku` | `back` |
| `ku_sungula` | `begin` |
| `makumu` | `end` |
| `ku_sungula_endzhaku` | `rbegin` |
| `makumu_endzhaku` | `rend` |
| `sula_hinkwaswo` | `clear` |
| `nghenisa_exikarhi` | `insert` |
| `sula` | `erase` |
| `endhawini` | `at` |
| `xiphemu` | `substr` |
| `namarhetela` | `append` |
| `matsalwa_c` | `c_str` |
| `pimanisa` | `compare` |
| `siva` | `replace` |
| `cinca_vukulu` | `resize` |
| `hlayisa_ndhawu` | `reserve` |
| `vuswikoti` | `capacity` |
| `xo_sungula` | `first` |
| `xa_vumbirhi` | `second` |
| `i_yini` | `what` |
| `pfula` | `open` |
| `pfala` | `close` |
| `xi_pfulekile` | `is_open` |
| `makumu_ya_fayili` | `eof` |
| `matsalwa_hinkwawo` | `str` |
| `veka_nakambe` | `reset` |
| `ntshunxa` | `release` |
| `hlanganisa` | `join` |
| `hambanisa` | `detach` |
| `lotlela` | `lock` |
| `lotlolola` | `unlock` |

## Library: Arduino / robots

| Xitsonga | C++ |
|---|---|
| `sungula` | `setup` |
| `phindha_phindha` | `loop` |
| `veka_phini` | `pinMode` |
| `tsala_dijitali` | `digitalWrite` |
| `hlaya_dijitali` | `digitalRead` |
| `hlaya_analogo` | `analogRead` |
| `tsala_analogo` | `analogWrite` |
| `rindza` | `delay` |
| `rindza_maykhro` | `delayMicroseconds` |
| `timilisekoni` | `millis` |
| `timaykhrosekoni` | `micros` |
| `sivela` | `constrain` |
| `mpfumawulo` | `tone` |
| `yimisa_mpfumawulo` | `noTone` |
| `khomanisa_ku_kavanyeta` | `attachInterrupt` |
| `HENHLA` | `HIGH` |
| `HANSI` | `LOW` |
| `LESWI_HUMAKA` | `OUTPUT` |
| `LESWI_NGHENAKA` | `INPUT` |
| `LESWI_NGHENAKA_HI_KU_KOKA` | `INPUT_PULLUP` |
| `LED_YA_ENDZENI` | `LED_BUILTIN` |
| `Siriyali` | `Serial` |
| `kombisa` | `print` |
| `kombisa_layini` | `println` |
| `leswi_kumekaka` | `available` |
| `hlaya_bayiti` | `read` |
| `tsala_bayiti` | `write` |

# Library packs

A pack switches on when you include one of its headers (in your language or in English).

## Arduino libraries

Headers: `#katsa <servo>` = `<Servo.h>`, `#katsa <waya>` = `<Wire.h>`, `#katsa <bazi_ya_spi>` = `<SPI.h>`, `#katsa <memori_leyi_tshamaka>` = `<EEPROM.h>`

| Xitsonga | C++ |
|---|---|
| `Xiservo` | `Servo` |
| `khomanisa` | `attach` |
| `tsala_timaykhrosekoni` | `writeMicroseconds` |
| `Waya` | `Wire` |
| `sungula_ku_rhumela` | `beginTransmission` |
| `hetisa_ku_rhumela` | `endTransmission` |
| `kombela_eka` | `requestFrom` |
| `loko_ku_amukeriwa` | `onReceive` |
| `loko_ku_kombeliwa` | `onRequest` |
| `Bazi_ya_spi` | `SPI` |
| `hundzisa` | `transfer` |
| `Memori_leyi_tshamaka` | `EEPROM` |
| `nghenisa_eka_yona` | `put` |
| `pfuxeta` | `update` |

## Arduino (always on)

| Xitsonga | C++ |
|---|---|
| `hlawula_hi_ku_tshuka` | `random` |
| `mbewu_ya_ku_tshuka` | `randomSeed` |
| `ringanisa_nakambe` | `map` |
| `pima_phalisi` | `pulseIn` |
| `phini_ku_kavanyeta` | `digitalPinToInterrupt` |
| `LOKO_YI_TLAKUKA` | `RISING` |
| `LOKO_YI_RHELELA` | `FALLING` |
| `LOKO_YI_CINCA` | `CHANGE` |
| `pfumelela_ku_kavanyeta` | `interrupts` |
| `sivela_ku_kavanyeta` | `noInterrupts` |
| `hlaya_nomboro` | `parseInt` |
| `hlaya_desimali` | `parseFloat` |
| `hlaya_matsalwa` | `readString` |
| `hlaya_matsalwa_ku_fikela` | `readStringUntil` |
| `yi_va_nomboro` | `toInt` |
| `yi_va_desimali` | `toFloat` |
| `ndhawu_ya` | `indexOf` |
| `xiphemu_xa_matsalwa` | `substring` |
| `tsema_swivandla` | `trim` |
| `yi_va_maletere_lamakulu` | `toUpperCase` |
| `yi_va_maletere_lamatsongo` | `toLowerCase` |
| `yi_sungula_hi` | `startsWith` |
| `yi_hela_hi` | `endsWith` |

## CUDA

Headers: `#katsa <gpu>` = `<cuda_runtime.h>`

| Xitsonga | C++ |
|---|---|
| `ntirho_wa_gpu` | `__global__` |
| `xa_gpu` | `__device__` |
| `xa_khompyuta` | `__host__` |
| `leswi_avelaniwaka_gpu` | `__shared__` |
| `ringanisa_tintambu` | `__syncthreads` |
| `nomboro_ya_ntambu` | `threadIdx` |
| `nomboro_ya_bloko` | `blockIdx` |
| `vukulu_bya_bloko` | `blockDim` |
| `vukulu_bya_gridi` | `gridDim` |
| `vukulu3` | `dim3` |
| `gpu_avela_memori` | `cudaMalloc` |
| `gpu_ntshunxa_memori` | `cudaFree` |
| `gpu_kopa_memori` | `cudaMemcpy` |
| `KU_SUKA_KHOMPYUTA_KU_GPU` | `cudaMemcpyHostToDevice` |
| `KU_SUKA_GPU_KU_KHOMPYUTA` | `cudaMemcpyDeviceToHost` |
| `gpu_rindza_yi_hetisa` | `cudaDeviceSynchronize` |
| `gpu_xihoxo_xo_hetelela` | `cudaGetLastError` |
| `gpu_matsalwa_ya_xihoxo` | `cudaGetErrorString` |
| `Xihoxo_xa_gpu` | `cudaError_t` |
| `GPU_SWI_HUMELERILE` | `cudaSuccess` |

## Eigen

Headers: `#katsa <timatriki>` = `<Eigen/Dense>`, `#katsa <timatriki_masungulo>` = `<Eigen/Core>`, `#katsa <jiyometiri>` = `<Eigen/Geometry>`

| Xitsonga | C++ |
|---|---|
| `timatriki` | `Eigen` |
| `Matriki` | `Eigen::MatrixXd` |
| `Vhekitara` | `Eigen::VectorXd` |
| `Matriki3` | `Eigen::Matrix3d` |
| `Matriki4` | `Eigen::Matrix4d` |
| `Vhekitara3` | `Eigen::Vector3d` |
| `Matriki_ya_muxaka` | `Eigen::Matrix` |
| `Khwatheniyoni` | `Eigen::Quaterniond` |
| `Engele_ni_ekisisi` | `Eigen::AngleAxisd` |
| `Vunwe` | `Identity` |
| `Ziro` | `Zero` |
| `Hinkwaswo_i_nwe` | `Ones` |
| `Hi_ku_tshuka` | `Random` |
| `hundzuluxa_matriki` | `transpose` |
| `leswi_hambaneke` | `inverse` |
| `xiboho` | `determinant` |
| `ku_leha_ka_vhekitara` | `norm` |
| `yi_ringanisiwe` | `normalized` |
| `vuhumelerisi_bya_thonsi` | `dot` |
| `vuhumelerisi_bya_xihambano` | `cross` |
| `tlhantlha` | `solve` |
| `hambanisa_qr` | `colPivHouseholderQr` |
| `swi_lava_ku_ringana` | `isApprox` |
| `Ekisisi_X` | `UnitX` |
| `Ekisisi_Y` | `UnitY` |
| `Ekisisi_Z` | `UnitZ` |
| `yi_va_matriki` | `matrix` |

## OpenCV

Headers: `#katsa <vonelo>` = `<opencv2/opencv.hpp>`, `#katsa <vonelo_masungulo>` = `<opencv2/core.hpp>`, `#katsa <vonelo_swifaniso>` = `<opencv2/imgproc.hpp>`, `#katsa <vonelo_mafasitere>` = `<opencv2/highgui.hpp>`, `#katsa <vonelo_vidiyo>` = `<opencv2/videoio.hpp>`, `#katsa <vonelo_ku_kuma_swilo>` = `<opencv2/objdetect.hpp>`

| Xitsonga | C++ |
|---|---|
| `vonelo` | `cv` |
| `Xifaniso` | `cv::Mat` |
| `hlaya_xifaniso` | `cv::imread` |
| `hlayisa_xifaniso` | `cv::imwrite` |
| `kombisa_xifaniso` | `cv::imshow` |
| `rindza_buto` | `cv::waitKey` |
| `endla_fasitere` | `cv::namedWindow` |
| `pfala_mafasitere_hinkwawo` | `cv::destroyAllWindows` |
| `cinca_muhlovo` | `cv::cvtColor` |
| `MUHLOVO_KU_MPUNGA` | `cv::COLOR_BGR2GRAY` |
| `MUHLOVO_KU_HSV` | `cv::COLOR_BGR2HSV` |
| `MUHLOVO_KU_RGB` | `cv::COLOR_BGR2RGB` |
| `pfilunganya` | `cv::GaussianBlur` |
| `kuma_tinsiya` | `cv::Canny` |
| `ndzilakano_wo_avanyisa` | `cv::threshold` |
| `NDZILAKANO_WA_MBIRHI` | `cv::THRESH_BINARY` |
| `cinca_vukulu_bya_xifaniso` | `cv::resize` |
| `dirowa_rhekithengele` | `cv::rectangle` |
| `dirowa_rhendzevutani` | `cv::circle` |
| `dirowa_layini` | `cv::line` |
| `tsala_exifanisweni` | `cv::putText` |
| `Phoyinti` | `cv::Point` |
| `Vuanami_ni_ku_leha` | `cv::Size` |
| `Nkoka_wa_muhlovo` | `cv::Scalar` |
| `Xiyenge` | `cv::Rect` |
| `Khamera` | `cv::VideoCapture` |
| `yi_pfuriwile` | `isOpened` |
| `tilayini` | `rows` |
| `tikholomu` | `cols` |
| `tikanele` | `channels` |
| `endla_khopi` | `clone` |
| `kopela_eka` | `copyTo` |
| `kuma_swivumbeko` | `cv::findContours` |
| `dirowa_swivumbeko` | `cv::drawContours` |
| `ndhawu_ya_xivumbeko` | `cv::contourArea` |
| `endzeni_ka_ndzilakano` | `cv::inRange` |
| `Muhlawuri` | `cv::CascadeClassifier` |
| `kuma_swilo` | `detectMultiScale` |
| `layicha` | `load` |
| `HLAYA_HI_MUHLOVO` | `cv::IMREAD_COLOR` |
| `HLAYA_HI_MPUNGA` | `cv::IMREAD_GRAYSCALE` |
| `FONTI_YO_OLOVA` | `cv::FONT_HERSHEY_SIMPLEX` |
| `Phikisele` | `cv::Vec3b` |
| `swi_tele_hi_0` | `zeros` |
| `swi_tele_hi_1` | `ones` |
| `SWIVUMBEKO_SWA_EHANDLE` | `cv::RETR_EXTERNAL` |
| `SWIVUMBEKO_LESWI_OLOVEKE` | `cv::CHAIN_APPROX_SIMPLE` |
| `bokisi_leri_rhendzeleke` | `cv::boundingRect` |
| `MUHLOVO_8BIT_3` | `CV_8UC3` |
| `vuanami` | `width` |
| `ku_leha_ehenhla` | `height` |

## ROS 2

Headers: `#katsa <ros2>` = `<rclcpp/rclcpp.hpp>`, `#katsa <rungula_ra_matsalwa>` = `<std_msgs/msg/string.hpp>`, `#katsa <rungula_ra_nomboro>` = `<std_msgs/msg/int32.hpp>`, `#katsa <rungula_ra_desimali>` = `<std_msgs/msg/float64.hpp>`, `#katsa <rungula_ra_buliyani>` = `<std_msgs/msg/bool.hpp>`, `#katsa <xileriso_xa_rivilo>` = `<geometry_msgs/msg/twist.hpp>`, `#katsa <xikena_xa_laser>` = `<sensor_msgs/msg/laser_scan.hpp>`, `#katsa <xifaniso_xa_sensa>` = `<sensor_msgs/msg/image.hpp>`

| Xitsonga | C++ |
|---|---|
| `ros` | `rclcpp` |
| `sungula_ros` | `rclcpp::init` |
| `pfala_ros` | `rclcpp::shutdown` |
| `fambisa_ros` | `rclcpp::spin` |
| `fambisa_ros_switsongo` | `rclcpp::spin_some` |
| `ros_ya_ha_hanya` | `rclcpp::ok` |
| `Fundzu` | `rclcpp::Node` |
| `Muhangalasi` | `rclcpp::Publisher` |
| `Matsariso` | `rclcpp::Subscription` |
| `Xihlayi_xa_nkarhi` | `rclcpp::TimerBase` |
| `endla_muhangalasi` | `create_publisher` |
| `endla_matsariso` | `create_subscription` |
| `endla_xihlayi_xa_nkarhi` | `create_wall_timer` |
| `hangalasa` | `publish` |
| `mutsari_wa_matimu` | `get_logger` |
| `ROS_MAHUNGU` | `RCLCPP_INFO` |
| `ROS_XITSUNDZUXO` | `RCLCPP_WARN` |
| `ROS_XIHOXO` | `RCLCPP_ERROR` |
| `Xikombi` | `SharedPtr` |
| `datha` | `data` |
| `leswi_kongomeke` | `linear` |
| `ku_rhendzeleka` | `angular` |
| `mpfhuka` | `ranges` |
| `tivisa_paramitha` | `declare_parameter` |
| `kuma_paramitha` | `get_parameter` |
| `rungula_ra_matsalwa` | `std_msgs::msg::String` |
| `rungula_ra_nomboro` | `std_msgs::msg::Int32` |
| `rungula_ra_desimali` | `std_msgs::msg::Float64` |
| `rungula_ra_buliyani` | `std_msgs::msg::Bool` |
| `xileriso_xa_rivilo` | `geometry_msgs::msg::Twist` |
| `xikena_xa_laser` | `sensor_msgs::msg::LaserScan` |
| `xifaniso_xa_sensa` | `sensor_msgs::msg::Image` |

## Standard library extras (always on)

| Xitsonga | C++ |
|---|---|
| `datha` | `data` |

## PyTorch (libtorch)

Headers: `#katsa <dyondzo_ya_michini>` = `<torch/torch.h>`

| Xitsonga | C++ |
|---|---|
| `dyondzo_ya_michini` | `torch` |
| `Thensa` | `torch::Tensor` |
| `endla_thensa` | `torch::tensor` |
| `swi_tele_hi_0` | `torch::zeros` |
| `swi_tele_hi_1` | `torch::ones` |
| `thensa_hi_ku_tshuka` | `torch::rand` |
| `thensa_hi_ku_tshuka_yo_tolovelekeke` | `torch::randn` |
| `veka_mbewu` | `torch::manual_seed` |
| `Xiphemu_xa_netiweke` | `torch::nn::Module` |
| `Lera_leri_kongomeke` | `torch::nn::Linear` |
| `Lera_ra_nhlanganiso2d` | `torch::nn::Conv2d` |
| `xihlohlotelo_relu` | `torch::relu` |
| `logo_ya_swikoweto` | `torch::log_softmax` |
| `ku_lahlekeriwa_ka_xikwere` | `torch::mse_loss` |
| `ku_lahlekeriwa_ka_swikoweto` | `torch::nll_loss` |
| `Antswisi_SGD` | `torch::optim::SGD` |
| `Antswisi_Adam` | `torch::optim::Adam` |
| `Xitirhisiwa` | `torch::Device` |
| `EKA_GPU` | `torch::kCUDA` |
| `EKA_CPU` | `torch::kCPU` |
| `gpu_yi_kona` | `torch::cuda::is_available` |
| `hlayisa_modlolo` | `torch::save` |
| `layicha_modlolo` | `torch::load` |
| `Murindzi_wa_ku_nga_dyondzi` | `torch::NoGradGuard` |
| `tsarisa_xiphemu` | `register_module` |
| `hundzisela_emahlweni` | `forward` |
| `tlhelela_endzhaku` | `backward` |
| `sula_ku_khinsama` | `zero_grad` |
| `teka_goza` | `step` |
| `yisa_eka` | `to` |
| `nkoka_wunwe` | `item` |
| `languta_tanihi` | `view` |
| `cinca_xivumbeko` | `reshape` |
| `andzisa_timatriki` | `matmul` |
| `ntsengo_wa_thensa` | `sum` |
| `xiringaniso_xa_thensa` | `mean` |
| `nkombo_wukulu` | `argmax` |
| `tiparamitha` | `parameters` |
| `leteri` | `train` |
| `kambela_modlolo` | `eval` |
