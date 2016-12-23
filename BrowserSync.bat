Title BrowserSync
@ECHO off

if not "%minimized%"=="" goto :minimized
set minimized=true
start /min cmd /C "%~dpnx0"
goto :EOF
:minimized

cls
browser-sync start --files "**/*, !**/*.gitignore, !**/*.ts" --proxy "http://localhost:1337/"