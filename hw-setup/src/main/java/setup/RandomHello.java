package setup;

import java.util.Random;

/**
 * RandomHello selects and prints a random greeting.
 */
public class RandomHello {

    /**
     * Prints a random greeting to the console
     *
     * @param args command-line arguments (ignored)
     */
    public static void main(String[] args) {
        RandomHello randomHello = new RandomHello();
        System.out.println(randomHello.getGreeting());
    }

    /**
     *
     * @return a greeting, randomly chosen from five possibilities
     */
    public String getGreeting() {
        Random random = new Random();
        String[] strings = new String[5];
        strings[0] = "Hello World!";
        strings[1] = "Welcome to CSE 331!";
        strings[2] = "Welcome to UW!";
        strings[3] = "Welcome to Allen school!";
        strings[4] = "Welcome! Future programmers!";
        return strings[random.nextInt(5)];
    }


}
