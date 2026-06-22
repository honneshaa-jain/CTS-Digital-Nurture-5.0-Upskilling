class Car {

    String make;
    String model;
    int year;

    Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    void displayDetails() {
        System.out.println("Make : " + make);
        System.out.println("Model: " + model);
        System.out.println("Year : " + year);
    }
}

public class CarDemo {

    public static void main(String[] args) {

        Car car1 = new Car("Toyota", "Innova", 2023);
        Car car2 = new Car("Hyundai", "Creta", 2024);

        car1.displayDetails();
        System.out.println();

        car2.displayDetails();
    }
}