const logout = () => {
    // Menampilkan Sweet Alert konfirmasi
    Swal.fire({
      icon: "question",
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Menghapus token dari cookie
        document.cookie =
          "Authorization= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "Role= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect ke halaman sign-in.html
        window.location.href = "../login.html";
      }
    });
  };
  
  window.logout = logout;