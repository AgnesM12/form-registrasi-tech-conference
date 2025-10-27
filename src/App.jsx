import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const validatePassword = (value) => {
  if (value.length < 8) {
    return "Password minimal 8 karakter";
  }
  if (!/\d/.test(value)) {
    return "Password setidaknya mengandung satu angka";
  }
  if (!/[!@#$%^&*]/.test(value)) {
    return "Password setidaknya mengadung 1 simbol";
  }
  return true;
};

function App(){
  const {register, handleSubmit, formState: { errors }, reset } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const onSubmit = (data) => {
    console.log("Formulir Registrasi:", data);
    setSubmittedName(data.fullName);
    setIsSubmitted(true);
    reset();
  };

  useEffect(() => {
    if(isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false)
        setSubmittedName("")
        reset();
      }, 3000);
      return()=> clearTimeout(timer);
    }
  }, [isSubmitted, reset]);

  const baseStyle = "w-full p-2 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500 focus:ring-0 focus:bg-white"
  const errorStyle = "border-red-500 focud:border-red-500 focus:ring-red-200"
  const errorMessage = "text-red-600 text-sm mt-1"

  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center min-h-screen">
      <div className="md:w-3/5 hidden md:block">
        <img
          src="/latar.jpg"
          alt="latar"
          className="w-full min-h-screen object-cover"
        />
      </div>
      <div className="md:w-2/5 w-full p-8 flex flex-col justify-center bg-stone-50">
      <div className="max-w-md mx-auto w-full">
        <h2 className="text-4xl font-bold mb-10 text-center font-poppins">
          Formulir Registrasi
        </h2>
        {isSubmitted && (
          <div className="bg-teal-100 text-teal-900 border border-teal-500 p-4 rounded-md text-center mb-6 font-semibold">
            Registrasi Berhasil, {submittedName}!
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* 1. Nama Lengkap */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-zinc-800">
              Nama Lengkap
            </label>
            <input
              {...register("fullName", { required: "Nama lengkap wajib diisi" })}
              className={`${baseStyle} ${
                errors.fullName ? errorStyle : ""
              }`}
            />
            {errors.fullName && (
              <p className={errorMessage}>{errors.fullName.message}</p>
            )}
          </div>
          {/* 2. Username */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-zinc-800">
              Username
            </label>
            <input
              {...register("username", {
                required: "Username wajib diisi",
                minLength: { value: 6, message: "Minimal 6 karakter" },
                maxLength: { value: 20, message: "Maksimal 20 karakter" },
              })}
              className={`${baseStyle} ${
                errors.username ? errorStyle : ""
              }`}
            />
            {errors.username && (
              <p className={errorMessage}>{errors.username.message}</p>
            )}
          </div>
          {/* 3. Email */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-zinc-800">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Format email tidak valid",
                },
              })}
              className={`${baseStyle} ${
                errors.email ? errorStyle : ""
              }`}
            />
            {errors.email && (
              <p className={errorMessage}>{errors.email.message}</p>
            )}
          </div>
          {/* 4. Password */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-zinc-800">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password wajib diisi",
                validate: validatePassword,
              })}
              className={`${baseStyle} ${
                errors.password ? errorStyle : ""
              }`}
            />
            {errors.password && (
              <p className={errorMessage}>{errors.password.message}</p>
            )}
          </div>
          {/* 5. Umur */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-zinc-800">
              Umur
            </label>
            <input
              type="number"
              {...register("age", {
                required: "Umur wajib diisi",
                valueAsNumber: true,
                min: { value: 18, message: "Minimal usia 18 tahun" },
                max: { value: 100, message: "Maksimal usia 100 tahun" },
              })}
              className={`${baseStyle} ${
                errors.age ? errorStyle : ""
              }`}
            />
            {errors.age && (
              <p className={errorMessage}>{errors.age.message}</p>
            )}
          </div>
          {/* 6. Tipe Tiket */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-zinc-800">
              Tipe Tiket
            </label>
            <select
              {...register("ticketType", {
                required: "Anda harus memilih tipe tiket",
              })}
              className={`${baseStyle} ${
                errors.ticketType ? errorStyle : ""
              }`}
            >
              <option value="">-- Pilih Tipe Tiket --</option>
              <option value="General Access">General Access</option>
              <option value="VIP">VIP</option>
              <option value="Student">Student</option>
            </select>
            {errors.ticketType && (
              <p className={errorMessage}>{errors.ticketType.message}</p>
            )}
          </div>
          {/* 7. Situs Web (Opsional) */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-zinc-800">
              Situs Web (Opsional)
            </label>
            <input
              type="url"
              {...register("websiteUrl", {
                pattern: {
                  value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                  message: "Format URL tidak valid",
                },
              })}
              className={`${baseStyle} ${
                errors.websiteUrl ? errorStyle : ""
              }`}
            />
            {errors.websiteUrl && (
              <p className={errorMessage}>{errors.websiteUrl.message}</p>
            )}
          </div>
          {/* 8. Syarat & Ketentuan */}
          <div className="mb-1 flex items-center">
            <input
              type="checkbox"
              {...register("agreeToTerms", {
                required: "Anda harus menyetujui syarat & ketentuan",
              })}
              className="mr-2 w-4 h-4 text-teal-600 border-black-300 rounded focus:ring-teal-500"
            />
            <label className="text-zinc-800">
              Saya setuju dengan Syarat & Ketentuan
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className={errorMessage}>{errors.agreeToTerms.message}</p>
          )}
          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-teal-600 text-white rounded-md text-lg font-semibold transition-colors duration-200 hover:bg-teal-700">
            Daftar
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default App;
