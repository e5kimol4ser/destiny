# Dependencies

- https://github.com/codemotionapps/react-native-dark-mode

- https://github.com/th3rdwave/react-native-safe-area-context

  ```
  import android.os.Build;
  import android.os.Bundle;
  import android.view.WindowManager;

  public class MainActivity extends ReactActivity {

    ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
        WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
        layoutParams.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        getWindow().setAttributes(layoutParams);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
      }
    }

  }
  ```
