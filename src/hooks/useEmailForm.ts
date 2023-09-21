import emailjs from "@emailjs/browser";
import { useState, type FormEvent, type ChangeEvent } from "react";

export const useEmailForm = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  } as const;

  const [formData, setFormData] = useState(initialValues);
  const [message, setMessage] = useState({ error: "", success: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getInfo = (name: keyof typeof formData) => {
    switch (name) {
      case "name":
        return {
          pattern: ".+{30}",
          required: true,
          placeholder: "your name",
        };
      case "email":
        return {
          pattern: "[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[a-zA-Z0-9]+",
          required: true,
          placeholder: "some@email.com",
        };
      case "phone":
        return {
          pattern: "[0-9]{8,13}",
          required: false,
          placeholder: "999999999",
        };
      case "message":
        return {
          pattern: "[a-zA-Z0-9]+",
          required: false,
          placeholder: "write something here",
        };
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.send(
      "service_gvc6531",
      "template_993zflo",
      formData,
      "kAHuxuzadrgkxtfmO",
    );

    emailjs
      .send(
        "service_gvc6531",
        "template_vvkp9qm",
        formData,
        "kAHuxuzadrgkxtfmO",
      )
      .then(
        () => {
          setMessage({ error: "", success: "Email sent successfully!" });
          setFormData(initialValues);
          setIsLoading(false);
          return;
        },
        () => {
          setMessage({ error: "Something went wrong...", success: "" });
          setIsLoading(false);
          return;
        },
      );
  };

  const props = (key: keyof typeof formData) => ({
    type: key === "email" ? "email" : "text",
    name: key,
    value: formData[key],
    required: getInfo(key).required,
    onChange: handleChange,
    pattern: getInfo(key).pattern,
    placeholder: getInfo(key).placeholder,
  });

  return {
    props,
    formData,
    message,
    isLoading,
    handleSubmit,
    getInfo,
  };
};
