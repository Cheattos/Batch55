function submitData() {
  const inputName = document.getElementById("inputName").value;
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPhone = document.getElementById("inputPhone").value;
  const inputSubject = document.getElementById("inputSubject").value;
  const inputMessage = document.getElementById("inputMessage").value;

  // Perkondisian
  if (inputName == "") {
    alert("Name harus diisi"); // Kondisi 1
  } else if (inputEmail == "") {
    alert("Email Harus Diisi"); // kondisi 2
  } else if (inputPhone == "") {
    alert("Phone Number tidak boleh K0s0n9"); //kondisi 3
  } else if (inputSubject == "") {
    alert("Subject tidak boleh kosong"); // kondisi 4
  } else if (inputMessage == "") {
    alert("Message tidak boleh kosong"); // kondisi 5
  }
  //    else {
  //     alert("jika semua kondisi sudah terpenuhi"); // kondisi terakhir
  //   }

  //   kita dapat memberikan kondisi lebih dari 1 dengan tanda hubung
  //  && (dan), || or

  //   if (
  //     inputName == "" &&
  //     inputEmail == "" &&
  //     inputPhone == "" &&
  //     inputSubject == "" &&
  //     inputMessage == ""
  //   ) {
  //     alert("Input Form harus diisi"); // Kondisi 1
  //   }

  // untuk perkondisian kerangkanya tidak harus menggunakan if, else if, dan else
  // kita bisa menggunakan if aja, atau else if aja, atau if else aja
  // yang tidak boleh adalah untuk kondisi pertama tidak menggunakan if
  // jadi if adalah kode wajib yang digunakan untuk permulaan sebuah perkondisian

  //   ketika dalam perkondisian kondisi yang tsudah terpenuhi maka akan mengecek perkondisian dibawahnya

  console.log(
    `Name : ${inputName}\nEmail : ${inputEmail}\nPhone : ${inputPhone}\nSubject : ${inputSubject}\nMessage : ${inputMessage}`
  );

  const myemail = "arre@gmail.com";

  let a = document.createElement("a");
  a.href = `mailto:${myemail}?subject=${inputSubject}&body=Hello my name ${inputName}, and my number ${inputPhone} ${inputMessage}`;
  a.click();
}
