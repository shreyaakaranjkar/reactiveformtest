export class CustomRegex {
    public static password = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$";
    public static onlyText = '[a-zA-Z]*';
    public static username = '^[a-zA-Z ]*$';
    public static email = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9-_.]+\\.[a-zA-Z]{2,100}$';
    public static updateEmail =
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,9}))$/';
}