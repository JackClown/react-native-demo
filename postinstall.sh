# 强行修改源代码
cp -f ./patches/react-native-code-push/react-native.config.js ./node_modules/react-native-code-push/react-native.config.js;
cp -f ./patches/react-native-code-push/CodePush.java ./node_modules/react-native-code-push/android/app/src/main/java/com/microsoft/codepush/react/CodePush.java;
