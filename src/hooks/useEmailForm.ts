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

  const info = {
    name: {
      pattern: ".+{30}",
      required: true,
      placeholder: "your name",
    },
    email: {
      pattern: "[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[a-zA-Z0-9]+",
      required: true,
      placeholder: "some@email.com",
    },
    phone: {
      pattern: "[0-9]{8,13}",
      required: false,
      placeholder: "999999999",
    },
    message: {
      pattern: "[a-zA-Z0-9]+",
      required: false,
      placeholder: "write something here",
    },
  } as const;

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
    required: info[key].required,
    onChange: handleChange,
    pattern: info[key].pattern,
    placeholder: info[key].placeholder,
  });

  return {
    props,
    formData,
    message,
    isLoading,
    handleSubmit,
    info,
  };
};
