# Lula: Afrikaans reference

> draft - needs review by Afrikaans speakers

Every word below can be used in `.af.lula` files. Plain English C++ keeps working too.

## Keywords: Control flow

| Afrikaans | C++ |
|---|---|
| `as` | `if` |
| `anders` | `else` |
| `kies` | `switch` |
| `geval` | `case` |
| `verstek` | `default` |
| `terwyl` | `while` |
| `doen` | `do` |
| `vir` | `for` |
| `breek` | `break` |
| `gaanvoort` | `continue` |
| `terug` | `return` |
| `spring` | `goto` |
| `probeer` | `try` |
| `vang` | `catch` |
| `gooi` | `throw` |
| `ko_wag` | `co_await` |
| `ko_terug` | `co_return` |
| `ko_lewer` | `co_yield` |

## Keywords: Data types

| Afrikaans | C++ |
|---|---|
| `heelgetal` | `int` |
| `dryfgetal` | `float` |
| `dubbel` | `double` |
| `karakter` | `char` |
| `karakter8` | `char8_t` |
| `karakter16` | `char16_t` |
| `karakter32` | `char32_t` |
| `wydkarakter` | `wchar_t` |
| `boolees` | `bool` |
| `leeg` | `void` |
| `kort` | `short` |
| `lank` | `long` |
| `geteken` | `signed` |
| `ongeteken` | `unsigned` |
| `outo` | `auto` |
| `tipevan` | `decltype` |

## Keywords: Modifiers

| Afrikaans | C++ |
|---|---|
| `konstant` | `const` |
| `vaskonstant` | `constexpr` |
| `kompileerevalueer` | `consteval` |
| `kompileerinisialiseer` | `constinit` |
| `staties` | `static` |
| `ekstern` | `extern` |
| `vlugtig` | `volatile` |
| `veranderlik` | `mutable` |
| `inlyn` | `inline` |
| `registreer` | `register` |
| `draadlokaal` | `thread_local` |
| `eksplisiet` | `explicit` |
| `geenuitsondering` | `noexcept` |
| `belynas` | `alignas` |

## Keywords: Classes, objects and structure

| Afrikaans | C++ |
|---|---|
| `klas` | `class` |
| `struktuur` | `struct` |
| `unie` | `union` |
| `opsomming` | `enum` |
| `publiek` | `public` |
| `privaat` | `private` |
| `beskermd` | `protected` |
| `virtueel` | `virtual` |
| `oorskryf` | `override` |
| `finaal` | `final` |
| `vriend` | `friend` |
| `hierdie` | `this` |
| `nuut` | `new` |
| `verwyder` | `delete` |
| `operateur` | `operator` |
| `sjabloon` | `template` |
| `tipenaam` | `typename` |
| `konsep` | `concept` |
| `vereis` | `requires` |
| `naamruimte` | `namespace` |
| `gebruik` | `using` |
| `tipedef` | `typedef` |
| `uitvoer` | `export` |
| `invoer` | `import` |
| `moduul` | `module` |
| `samesteller` | `asm` |

## Keywords: Casts and compile-time

| Afrikaans | C++ |
|---|---|
| `omskakel` | `static_cast` |
| `dinamies_omskakel` | `dynamic_cast` |
| `konstant_omskakel` | `const_cast` |
| `herinterpreteer_omskakel` | `reinterpret_cast` |
| `tipeid` | `typeid` |
| `groottevan` | `sizeof` |
| `belyningvan` | `alignof` |
| `staties_beweer` | `static_assert` |

## Keywords: Constants

| Afrikaans | C++ |
|---|---|
| `waar` | `true` |
| `vals` | `false` |
| `nulwyser` | `nullptr` |

## Keywords: Word operators

| Afrikaans | C++ |
|---|---|
| `en` | `and` |
| `of` | `or` |
| `nie` | `not` |
| `niegelyk` | `not_eq` |
| `en_gelyk` | `and_eq` |
| `of_gelyk` | `or_eq` |
| `eksof` | `xor` |
| `eksof_gelyk` | `xor_eq` |
| `bisen` | `bitand` |
| `bisof` | `bitor` |
| `komplement` | `compl` |

## Preprocessor

| Afrikaans | C++ |
|---|---|
| `#sluitin` | `#include` |
| `#definieer` | `#define` |
| `#ondefinieer` | `#undef` |
| `#as` | `#if` |
| `#asgedefinieer` | `#ifdef` |
| `#asniegedefinieer` | `#ifndef` |
| `#andersas` | `#elif` |
| `#andersasgedefinieer` | `#elifdef` |
| `#andersasniegedefinieer` | `#elifndef` |
| `#anders` | `#else` |
| `#eindeas` | `#endif` |
| `#reël` | `#line` |
| `#fout` | `#error` |
| `#waarskuwing` | `#warning` |
| `#direktief` | `#pragma` |

## Header files

| Afrikaans | C++ |
|---|---|
| `<alles>` | `<bits/stdc++.h>` |
| `<invoeruitvoer>` | `<iostream>` |
| `<teks>` | `<string>` |
| `<lys>` | `<vector>` |
| `<kaart>` | `<map>` |
| `<ongesorteerdekaart>` | `<unordered_map>` |
| `<versameling>` | `<set>` |
| `<ongesorteerdeversameling>` | `<unordered_set>` |
| `<tou>` | `<queue>` |
| `<stapel>` | `<stack>` |
| `<dubbeltou>` | `<deque>` |
| `<skakellys>` | `<list>` |
| `<skikking>` | `<array>` |
| `<algoritmes>` | `<algorithm>` |
| `<wiskunde>` | `<cmath>` |
| `<c_standaard>` | `<cstdlib>` |
| `<tyd>` | `<ctime>` |
| `<lêers>` | `<fstream>` |
| `<teksstroom>` | `<sstream>` |
| `<formatering>` | `<iomanip>` |
| `<nutsfunksies>` | `<utility>` |
| `<geheue>` | `<memory>` |
| `<funksioneel>` | `<functional>` |
| `<numeries>` | `<numeric>` |
| `<grense>` | `<limits>` |
| `<c_grense>` | `<climits>` |
| `<vastegetalle>` | `<cstdint>` |
| `<c_teks>` | `<cstring>` |
| `<karaktertipes>` | `<cctype>` |
| `<chronometer>` | `<chrono>` |
| `<draad>` | `<thread>` |
| `<slot>` | `<mutex>` |
| `<uitsondering>` | `<exception>` |
| `<foute>` | `<stdexcept>` |
| `<deurloper>` | `<iterator>` |
| `<tupel>` | `<tuple>` |
| `<opsioneel>` | `<optional>` |
| `<lukraak>` | `<random>` |
| `<bisstel>` | `<bitset>` |

## Library: Core

| Afrikaans | C++ |
|---|---|
| `hoof` | `main` |
| `standaard` | `std` |
| `gedefinieer` | `defined` |
| `drukf` | `printf` |
| `skandeerf` | `scanf` |

## Library: Input / output and files

| Afrikaans | C++ |
|---|---|
| `skryf` | `std::cout` |
| `lees` | `std::cin` |
| `skryffout` | `std::cerr` |
| `skryflog` | `std::clog` |
| `nuwereël` | `std::endl` |
| `leesreël` | `std::getline` |
| `spoel` | `std::flush` |
| `vastepunt` | `std::fixed` |
| `stelpresisie` | `std::setprecision` |
| `stelwydte` | `std::setw` |
| `leeslêer` | `std::ifstream` |
| `skryflêer` | `std::ofstream` |
| `lêer` | `std::fstream` |
| `teksstroom` | `std::stringstream` |
| `leesteksstroom` | `std::istringstream` |
| `skryfteksstroom` | `std::ostringstream` |

## Library: Data types

| Afrikaans | C++ |
|---|---|
| `groottetipe` | `std::size_t` |
| `heelgetal8` | `std::int8_t` |
| `heelgetal16` | `std::int16_t` |
| `heelgetal32` | `std::int32_t` |
| `heelgetal64` | `std::int64_t` |
| `ongeteken8` | `std::uint8_t` |
| `ongeteken16` | `std::uint16_t` |
| `ongeteken32` | `std::uint32_t` |
| `ongeteken64` | `std::uint64_t` |

## Library: Containers (STL)

| Afrikaans | C++ |
|---|---|
| `teks` | `std::string` |
| `lys` | `std::vector` |
| `kaart` | `std::map` |
| `ongesorteerdekaart` | `std::unordered_map` |
| `multikaart` | `std::multimap` |
| `versameling` | `std::set` |
| `ongesorteerdeversameling` | `std::unordered_set` |
| `multiversameling` | `std::multiset` |
| `tou` | `std::queue` |
| `prioriteitstou` | `std::priority_queue` |
| `stapel` | `std::stack` |
| `dubbeltou` | `std::deque` |
| `skakellys` | `std::list` |
| `skikking` | `std::array` |
| `paar` | `std::pair` |
| `tupel` | `std::tuple` |
| `bisstel` | `std::bitset` |
| `opsioneel` | `std::optional` |
| `maakpaar` | `std::make_pair` |
| `maaktupel` | `std::make_tuple` |
| `kry` | `std::get` |
| `bind` | `std::tie` |
| `skuif` | `std::move` |

## Library: Smart pointers

| Afrikaans | C++ |
|---|---|
| `uniekewyser` | `std::unique_ptr` |
| `gedeeldewyser` | `std::shared_ptr` |
| `swakwyser` | `std::weak_ptr` |
| `maakuniek` | `std::make_unique` |
| `maakgedeel` | `std::make_shared` |

## Library: Algorithms

| Afrikaans | C++ |
|---|---|
| `sorteer` | `std::sort` |
| `keerom` | `std::reverse` |
| `vind` | `std::find` |
| `tel` | `std::count` |
| `maksimum` | `std::max` |
| `minimum` | `std::min` |
| `grootste_element` | `std::max_element` |
| `kleinste_element` | `std::min_element` |
| `somtotaal` | `std::accumulate` |
| `binêresoek` | `std::binary_search` |
| `ondergrens` | `std::lower_bound` |
| `bogrens` | `std::upper_bound` |
| `vul` | `std::fill` |
| `kopieer` | `std::copy` |
| `transformeer` | `std::transform` |
| `virelke` | `std::for_each` |
| `uniek` | `std::unique` |
| `volgendepermutasie` | `std::next_permutation` |
| `ruil` | `std::swap` |
| `vulreeks` | `std::iota` |

## Library: Math

| Afrikaans | C++ |
|---|---|
| `absoluut` | `std::abs` |
| `wortel` | `std::sqrt` |
| `mag` | `std::pow` |
| `plafon` | `std::ceil` |
| `vloer` | `std::floor` |
| `rond` | `std::round` |
| `sinus` | `std::sin` |
| `kosinus` | `std::cos` |
| `tangens` | `std::tan` |
| `natlog` | `std::log` |
| `logtien` | `std::log10` |
| `eksp` | `std::exp` |
| `skuinssy` | `std::hypot` |
| `restant` | `std::fmod` |
| `ggd` | `std::gcd` |
| `kgv` | `std::lcm` |
| `getalgrense` | `std::numeric_limits` |
| `lukraak` | `std::rand` |
| `saailukraak` | `std::srand` |
| `tyd` | `std::time` |

## Library: Strings and characters

| Afrikaans | C++ |
|---|---|
| `nateks` | `std::to_string` |
| `naheelgetal` | `std::stoi` |
| `nalank` | `std::stol` |
| `nadubbel` | `std::stod` |
| `nahoofletter` | `std::toupper` |
| `nakleinletter` | `std::tolower` |
| `issyfer` | `std::isdigit` |
| `isletter` | `std::isalpha` |
| `isspasie` | `std::isspace` |
| `ishoofletter` | `std::isupper` |
| `iskleinletter` | `std::islower` |

## Library: Exceptions

| Afrikaans | C++ |
|---|---|
| `uitsondering` | `std::exception` |
| `looptydfout` | `std::runtime_error` |
| `logikafout` | `std::logic_error` |
| `buitebereik` | `std::out_of_range` |
| `ongeldigeargument` | `std::invalid_argument` |

## Library: Threads

| Afrikaans | C++ |
|---|---|
| `draad` | `std::thread` |
| `slot` | `std::mutex` |
| `slotwag` | `std::lock_guard` |

## Library: Member functions (use after `.` or `->`)

| Afrikaans | C++ |
|---|---|
| `grootte` | `size` |
| `lengte` | `length` |
| `isleeg` | `empty` |
| `voegagter` | `push_back` |
| `verwyderagter` | `pop_back` |
| `voegvoor` | `push_front` |
| `verwydervoor` | `pop_front` |
| `plaas` | `emplace` |
| `plaasagter` | `emplace_back` |
| `stoot` | `push` |
| `haalaf` | `pop` |
| `bokant` | `top` |
| `voorste` | `front` |
| `agterste` | `back` |
| `begin` | `begin` |
| `einde` | `end` |
| `trubegin` | `rbegin` |
| `trueinde` | `rend` |
| `maakskoon` | `clear` |
| `voegin` | `insert` |
| `uitvee` | `erase` |
| `by` | `at` |
| `subteks` | `substr` |
| `aanheg` | `append` |
| `c_teks` | `c_str` |
| `vergelyk` | `compare` |
| `vervang` | `replace` |
| `hergrootte` | `resize` |
| `reserveer` | `reserve` |
| `kapasiteit` | `capacity` |
| `eerste` | `first` |
| `tweede` | `second` |
| `wat` | `what` |
| `oopmaak` | `open` |
| `toemaak` | `close` |
| `isoop` | `is_open` |
| `lêereinde` | `eof` |
| `alsteks` | `str` |
| `herstel` | `reset` |
| `laatgaan` | `release` |
| `aansluit` | `join` |
| `ontkoppel` | `detach` |
| `sluit` | `lock` |
| `ontsluit` | `unlock` |

## Library: Arduino / robots

| Afrikaans | C++ |
|---|---|
| `opstel` | `setup` |
| `lus` | `loop` |
| `penmodus` | `pinMode` |
| `skryfdigitaal` | `digitalWrite` |
| `leesdigitaal` | `digitalRead` |
| `leesanaloog` | `analogRead` |
| `skryfanaloog` | `analogWrite` |
| `wag` | `delay` |
| `wagmikro` | `delayMicroseconds` |
| `millisekondes` | `millis` |
| `mikrosekondes` | `micros` |
| `beperk` | `constrain` |
| `toon` | `tone` |
| `geentoon` | `noTone` |
| `hegonderbreking` | `attachInterrupt` |
| `HOOG` | `HIGH` |
| `LAAG` | `LOW` |
| `UITSET` | `OUTPUT` |
| `INSET` | `INPUT` |
| `INSET_OPTREK` | `INPUT_PULLUP` |
| `INGEBOUDE_LED` | `LED_BUILTIN` |
| `Seriaal` | `Serial` |
| `druk` | `print` |
| `drukreël` | `println` |
| `beskikbaar` | `available` |
| `leesgreep` | `read` |
| `skryfgreep` | `write` |

# Library packs

A pack switches on when you include one of its headers (in your language or in English).

## Arduino libraries

Headers: `#sluitin <servo>` = `<Servo.h>`, `#sluitin <kabel>` = `<Wire.h>`, `#sluitin <spi_bus>` = `<SPI.h>`, `#sluitin <permanente_geheue>` = `<EEPROM.h>`

| Afrikaans | C++ |
|---|---|
| `Servomotor` | `Servo` |
| `koppel` | `attach` |
| `skryf_mikrosekondes` | `writeMicroseconds` |
| `Kabel` | `Wire` |
| `begin_stuur` | `beginTransmission` |
| `klaar_stuur` | `endTransmission` |
| `vra_van` | `requestFrom` |
| `by_ontvangs` | `onReceive` |
| `by_versoek` | `onRequest` |
| `Spi_bus` | `SPI` |
| `oordra` | `transfer` |
| `Permanente_geheue` | `EEPROM` |
| `plaas_in` | `put` |
| `bywerk` | `update` |

## Arduino (always on)

| Afrikaans | C++ |
|---|---|
| `kies_lukraak` | `random` |
| `lukraak_saad` | `randomSeed` |
| `herskaal` | `map` |
| `meet_puls` | `pulseIn` |
| `pen_na_onderbreking` | `digitalPinToInterrupt` |
| `STYGEND` | `RISING` |
| `DALEND` | `FALLING` |
| `VERANDER` | `CHANGE` |
| `laat_onderbrekings_toe` | `interrupts` |
| `keer_onderbrekings` | `noInterrupts` |
| `lees_heelgetal` | `parseInt` |
| `lees_desimaal` | `parseFloat` |
| `lees_teks` | `readString` |
| `lees_teks_tot` | `readStringUntil` |
| `na_heelgetal` | `toInt` |
| `na_desimaal` | `toFloat` |
| `posisie_van` | `indexOf` |
| `deelteks` | `substring` |
| `knip` | `trim` |
| `na_hoofletters` | `toUpperCase` |
| `na_kleinletters` | `toLowerCase` |
| `begin_met` | `startsWith` |
| `eindig_met` | `endsWith` |

## CUDA

Headers: `#sluitin <gpu>` = `<cuda_runtime.h>`

| Afrikaans | C++ |
|---|---|
| `gpu_kern` | `__global__` |
| `op_gpu` | `__device__` |
| `op_rekenaar` | `__host__` |
| `gedeel_gpu` | `__shared__` |
| `sinkroniseer_drade` | `__syncthreads` |
| `draadnommer` | `threadIdx` |
| `bloknommer` | `blockIdx` |
| `blokgrootte` | `blockDim` |
| `roostergrootte` | `gridDim` |
| `grootte3` | `dim3` |
| `gpu_ken_geheue_toe` | `cudaMalloc` |
| `gpu_maak_geheue_vry` | `cudaFree` |
| `gpu_kopieer_geheue` | `cudaMemcpy` |
| `REKENAAR_NA_GPU` | `cudaMemcpyHostToDevice` |
| `GPU_NA_REKENAAR` | `cudaMemcpyDeviceToHost` |
| `gpu_wag_tot_klaar` | `cudaDeviceSynchronize` |
| `gpu_laaste_fout` | `cudaGetLastError` |
| `gpu_fout_teks` | `cudaGetErrorString` |
| `Gpu_fout` | `cudaError_t` |
| `GPU_SUKSES` | `cudaSuccess` |

## Eigen

Headers: `#sluitin <matrikse>` = `<Eigen/Dense>`, `#sluitin <matrikse_kern>` = `<Eigen/Core>`, `#sluitin <meetkunde>` = `<Eigen/Geometry>`

| Afrikaans | C++ |
|---|---|
| `matrikse` | `Eigen` |
| `Matriks` | `Eigen::MatrixXd` |
| `Vektor` | `Eigen::VectorXd` |
| `Matriks3` | `Eigen::Matrix3d` |
| `Matriks4` | `Eigen::Matrix4d` |
| `Vektor3` | `Eigen::Vector3d` |
| `Matriks_van_tipe` | `Eigen::Matrix` |
| `Kwaternioon` | `Eigen::Quaterniond` |
| `Hoek_en_as` | `Eigen::AngleAxisd` |
| `Identiteit` | `Identity` |
| `Nul` | `Zero` |
| `Ene` | `Ones` |
| `Lukraak` | `Random` |
| `transponeer` | `transpose` |
| `omgekeerde` | `inverse` |
| `bepaler` | `determinant` |
| `lengte_van` | `norm` |
| `genormaliseer` | `normalized` |
| `puntproduk` | `dot` |
| `kruisproduk` | `cross` |
| `los_op` | `solve` |
| `qr_ontbinding` | `colPivHouseholderQr` |
| `ongeveer_gelyk` | `isApprox` |
| `As_X` | `UnitX` |
| `As_Y` | `UnitY` |
| `As_Z` | `UnitZ` |
| `as_matriks` | `matrix` |

## OpenCV

Headers: `#sluitin <rekenaarvisie>` = `<opencv2/opencv.hpp>`, `#sluitin <visie_kern>` = `<opencv2/core.hpp>`, `#sluitin <visie_beelde>` = `<opencv2/imgproc.hpp>`, `#sluitin <visie_vensters>` = `<opencv2/highgui.hpp>`, `#sluitin <visie_video>` = `<opencv2/videoio.hpp>`, `#sluitin <visie_objekte>` = `<opencv2/objdetect.hpp>`

| Afrikaans | C++ |
|---|---|
| `rekenaarvisie` | `cv` |
| `Beeld` | `cv::Mat` |
| `lees_beeld` | `cv::imread` |
| `stoor_beeld` | `cv::imwrite` |
| `wys_beeld` | `cv::imshow` |
| `wag_sleutel` | `cv::waitKey` |
| `skep_venster` | `cv::namedWindow` |
| `sluit_alle_vensters` | `cv::destroyAllWindows` |
| `skakel_kleur_om` | `cv::cvtColor` |
| `KLEUR_NA_GRYS` | `cv::COLOR_BGR2GRAY` |
| `KLEUR_NA_HSV` | `cv::COLOR_BGR2HSV` |
| `KLEUR_NA_RGB` | `cv::COLOR_BGR2RGB` |
| `vervaag` | `cv::GaussianBlur` |
| `vind_rande` | `cv::Canny` |
| `drempel` | `cv::threshold` |
| `DREMPEL_BINÊR` | `cv::THRESH_BINARY` |
| `verander_beeldgrootte` | `cv::resize` |
| `teken_reghoek` | `cv::rectangle` |
| `teken_sirkel` | `cv::circle` |
| `teken_lyn` | `cv::line` |
| `skryf_op_beeld` | `cv::putText` |
| `Punt` | `cv::Point` |
| `Grootte` | `cv::Size` |
| `Kleurwaarde` | `cv::Scalar` |
| `Reghoekgebied` | `cv::Rect` |
| `Kamera` | `cv::VideoCapture` |
| `is_oopgemaak` | `isOpened` |
| `rye` | `rows` |
| `kolomme` | `cols` |
| `kanale` | `channels` |
| `kloon` | `clone` |
| `kopieer_na` | `copyTo` |
| `vind_kontoere` | `cv::findContours` |
| `teken_kontoere` | `cv::drawContours` |
| `kontoerarea` | `cv::contourArea` |
| `binne_bereik` | `cv::inRange` |
| `Klassifiseerder` | `cv::CascadeClassifier` |
| `vind_objekte` | `detectMultiScale` |
| `laai` | `load` |
| `LEES_IN_KLEUR` | `cv::IMREAD_COLOR` |
| `LEES_IN_GRYS` | `cv::IMREAD_GRAYSCALE` |
| `EENVOUDIGE_LETTERTIPE` | `cv::FONT_HERSHEY_SIMPLEX` |
| `Pixel` | `cv::Vec3b` |
| `nulle_vol` | `zeros` |
| `ene_vol` | `ones` |
| `BUITENSTE_KONTOERE` | `cv::RETR_EXTERNAL` |
| `EENVOUDIGE_KONTOERE` | `cv::CHAIN_APPROX_SIMPLE` |
| `omringende_reghoek` | `cv::boundingRect` |
| `KLEUR_8BIT_3` | `CV_8UC3` |
| `breedte` | `width` |
| `hoogte` | `height` |

## ROS 2

Headers: `#sluitin <ros2>` = `<rclcpp/rclcpp.hpp>`, `#sluitin <teksboodskap>` = `<std_msgs/msg/string.hpp>`, `#sluitin <heelgetalboodskap>` = `<std_msgs/msg/int32.hpp>`, `#sluitin <desimaalboodskap>` = `<std_msgs/msg/float64.hpp>`, `#sluitin <booleboodskap>` = `<std_msgs/msg/bool.hpp>`, `#sluitin <snelheidsbevel>` = `<geometry_msgs/msg/twist.hpp>`, `#sluitin <laserskandering>` = `<sensor_msgs/msg/laser_scan.hpp>`, `#sluitin <sensorbeeld>` = `<sensor_msgs/msg/image.hpp>`

| Afrikaans | C++ |
|---|---|
| `ros` | `rclcpp` |
| `begin_ros` | `rclcpp::init` |
| `sluit_ros` | `rclcpp::shutdown` |
| `draai_ros` | `rclcpp::spin` |
| `draai_ros_bietjie` | `rclcpp::spin_some` |
| `ros_leef` | `rclcpp::ok` |
| `Nodus` | `rclcpp::Node` |
| `Uitsaaier` | `rclcpp::Publisher` |
| `Intekening` | `rclcpp::Subscription` |
| `Tydhouer` | `rclcpp::TimerBase` |
| `skep_uitsaaier` | `create_publisher` |
| `skep_intekening` | `create_subscription` |
| `skep_tydhouer` | `create_wall_timer` |
| `publiseer` | `publish` |
| `logboek` | `get_logger` |
| `ROS_INLIGTING` | `RCLCPP_INFO` |
| `ROS_WAARSKUWING` | `RCLCPP_WARN` |
| `ROS_FOUT` | `RCLCPP_ERROR` |
| `Wyser` | `SharedPtr` |
| `gegewens` | `data` |
| `lineêr` | `linear` |
| `hoekig` | `angular` |
| `afstande` | `ranges` |
| `verklaar_parameter` | `declare_parameter` |
| `kry_parameter` | `get_parameter` |
| `teksboodskap` | `std_msgs::msg::String` |
| `heelgetalboodskap` | `std_msgs::msg::Int32` |
| `desimaalboodskap` | `std_msgs::msg::Float64` |
| `booleboodskap` | `std_msgs::msg::Bool` |
| `snelheidsbevel` | `geometry_msgs::msg::Twist` |
| `laserskandering` | `sensor_msgs::msg::LaserScan` |
| `sensorbeeld` | `sensor_msgs::msg::Image` |

## Standard library extras (always on)

| Afrikaans | C++ |
|---|---|
| `gegewens` | `data` |

## PyTorch (libtorch)

Headers: `#sluitin <masjienleer>` = `<torch/torch.h>`

| Afrikaans | C++ |
|---|---|
| `masjienleer` | `torch` |
| `Tensoor` | `torch::Tensor` |
| `maak_tensoor` | `torch::tensor` |
| `nulle_vol` | `torch::zeros` |
| `ene_vol` | `torch::ones` |
| `lukraak_tensoor` | `torch::rand` |
| `normaal_lukraak_tensoor` | `torch::randn` |
| `stel_saad` | `torch::manual_seed` |
| `Netwerkmodule` | `torch::nn::Module` |
| `Lineêre_laag` | `torch::nn::Linear` |
| `Konvolusielaag2d` | `torch::nn::Conv2d` |
| `aktiveer_relu` | `torch::relu` |
| `log_waarskynlikhede` | `torch::log_softmax` |
| `gemiddelde_kwadraatverlies` | `torch::mse_loss` |
| `waarskynlikheidsverlies` | `torch::nll_loss` |
| `Optimeerder_SGD` | `torch::optim::SGD` |
| `Optimeerder_Adam` | `torch::optim::Adam` |
| `Toestel` | `torch::Device` |
| `OP_GPU` | `torch::kCUDA` |
| `OP_CPU` | `torch::kCPU` |
| `gpu_beskikbaar` | `torch::cuda::is_available` |
| `stoor_model` | `torch::save` |
| `laai_model` | `torch::load` |
| `Geen_gradient_wag` | `torch::NoGradGuard` |
| `registreer_module` | `register_module` |
| `vorentoe` | `forward` |
| `agtertoe` | `backward` |
| `nul_gradiente` | `zero_grad` |
| `neem_stap` | `step` |
| `stuur_na` | `to` |
| `enkelwaarde` | `item` |
| `bekyk_as` | `view` |
| `hervorm` | `reshape` |
| `matriksvermenigvuldig` | `matmul` |
| `som_van` | `sum` |
| `gemiddeld_van` | `mean` |
| `grootste_indeks` | `argmax` |
| `parameterlys` | `parameters` |
| `oefen` | `train` |
| `evalueer` | `eval` |
