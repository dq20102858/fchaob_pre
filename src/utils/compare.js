import  resemble from 'resemblejs'
export function compareTo(file,file2) {
  resemble(file).compareTo(file2).ignoreColors().ignoreAntialiasing().onComplete(function(data) {
    console.log(data);
  });
}
