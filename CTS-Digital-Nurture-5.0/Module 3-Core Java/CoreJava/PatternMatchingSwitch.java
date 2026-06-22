public class PatternMatchingSwitch {

    static void checkType(Object obj) {

        if (obj == null) {

            System.out.println("Null Value");

        } else if (obj instanceof Integer) {

            Integer i = (Integer) obj;
            System.out.println("Integer: " + i);

        } else if (obj instanceof String) {

            String s = (String) obj;
            System.out.println("String: " + s);

        } else if (obj instanceof Double) {

            Double d = (Double) obj;
            System.out.println("Double: " + d);

        } else {

            System.out.println("Unknown Type");
        }
    }

    public static void main(String[] args) {

        checkType(100);
        checkType("CTS");
        checkType(45.67);
    }
}
