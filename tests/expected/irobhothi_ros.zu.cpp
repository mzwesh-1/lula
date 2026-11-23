// I-node ye-ROS 2: thumela umyalo wejubane kurobhothi, ubheke inzwa ye-laser.
// A ROS 2 node: drive a robot forward and stop when the laser sees an obstacle.
//   lula translate examples/irobhothi_ros.zu.lula -o ~/ros2_ws/src/umshayeli/src/umshayeli.cpp
//   colcon build   (inside your ROS 2 workspace)
#include <rclcpp/rclcpp.hpp>
#include <geometry_msgs/msg/twist.hpp>
#include <sensor_msgs/msg/laser_scan.hpp>
#include <chrono>
#include <algorithm>

using namespace std::chrono_literals;

class Umshayeli : public rclcpp::Node {
public:
    Umshayeli() : rclcpp::Node("umshayeli") {
        ibanga_eliphephile_ = declare_parameter("ibanga_eliphephile", 0.5);
        umsakazi_ = create_publisher<geometry_msgs::msg::Twist>("cmd_vel", 10);
        ukubhalisa_ = create_subscription<sensor_msgs::msg::LaserScan>("scan", 10,
            [this](const sensor_msgs::msg::LaserScan::SharedPtr ukuskena) { this->kufike_ukuskena(ukuskena); });
        isibali_ = create_wall_timer(100ms, [this]() { this->shayela(); });
        RCLCPP_INFO(get_logger(), "Umshayeli usekulungele. Ibanga eliphephile: %.2f m", ibanga_eliphephile_);
    }

private:
    void kufike_ukuskena(const sensor_msgs::msg::LaserScan::SharedPtr ukuskena) {
        auto eduze = std::min_element(ukuskena->ranges.begin(), ukuskena->ranges.end());
        ibanga_eliseduze_ = *eduze;
    }

    void shayela() {
        geometry_msgs::msg::Twist umyalo;
        if (ibanga_eliseduze_ > ibanga_eliphephile_) {
            umyalo.linear.x = 0.2;      // hamba phambili (drive forward)
        } else {
            umyalo.angular.z = 0.5;   // jika (turn away)
            RCLCPP_WARN(get_logger(), "Isithiyo ku-%.2f m: ngiyajika", ibanga_eliseduze_);
        }
        umsakazi_->publish(umyalo);
    }

    rclcpp::Publisher<geometry_msgs::msg::Twist>::SharedPtr umsakazi_;
    rclcpp::Subscription<sensor_msgs::msg::LaserScan>::SharedPtr ukubhalisa_;
    rclcpp::TimerBase::SharedPtr isibali_;
    double ibanga_eliphephile_ = 0.5;
    double ibanga_eliseduze_ = 10.0;
};

int main(int argc, char* argv[]) {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<Umshayeli>());
    rclcpp::shutdown();
    return 0;
}
