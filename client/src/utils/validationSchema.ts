import moment from "moment";
import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Name is required")
    .min(5, "Name can not be less than 5 character"),
  phoneNumber: Yup.number()
    .required("required")
    .typeError("Phone number must be valid")
    .min(10, "Must be 10 digit"),
  email: Yup.string()
    .lowercase("Email must be lowercase")
    .strict()
    .required("")
    .email("Email is invalid"),
  password: Yup.string()
    .required("")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
  confirmPassword: Yup.string()
    .required("")
    .oneOf([Yup.ref("password")], "Confirm Password does not match"),
});

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const EmployerBasicInformationSchema = Yup.object().shape({
  summary: Yup.string().required(),
  industryType: Yup.number().required(),
  organizationName: Yup.string().required(),
  address: Yup.string().required(),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 characters")
    .matches(phoneRegExp, "Phone number is not valid"),
});

export const CreateJobStepOneSchema = Yup.object().shape({
  title: Yup.string().required(""),
  experienceRequired: Yup.string().required(),
  salary: Yup.string().required(),
  deadline: Yup.date()
    .min(new Date(), "deadline must be in the future")
    .required("deadline is required")
    .typeError("deadline must be a valid date"),
  categoryId: Yup.string().required(),
  location: Yup.string().required(""),
});

export const CreateJobStepTwoSchema = Yup.object().shape({
  levelId: Yup.string().required(),
  noOfVacancy: Yup.number()
    .required()
    .typeError("total vacancy must be a number type"),
  description: Yup.string().required(),
  typeId: Yup.string().required(),
  skills: Yup.array().of(Yup.string()).notRequired(),
  educationRequired: Yup.string().max(200).required("required"),
});

export const JobseekerJobPreferenceSchema = Yup.object().shape({
  objective: Yup.string().required(),
  jobTitle: Yup.string().required("required"),
  jobCategories: Yup.array()
    .of(Yup.string().required())
    .min(1, "This is required")
    .required(),
  jobIndustries: Yup.array()
    .of(Yup.string().required())
    .min(1, "This is required")
    .required(),
  jobTypeId: Yup.string().required("required"),
  jobLevelId: Yup.string().required("required"),
  jobLocation: Yup.string().required("required"),
  expectedSalary: Yup.string().required("required"),
  skills: Yup.array()
    .of(Yup.string().required())
    .min(1, "This is required")
    .required(),
});

export const JobseekerBasicInfoSchema = Yup.object().shape({
  fullname: Yup.string().required("required"),
  image: Yup.string(),
  currentAddress: Yup.string().required("required"),
  permanentAddress: Yup.string().required("required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 characters")
    .matches(phoneRegExp, "Phone number is not valid"),
  gender: Yup.string().oneOf(["male", "female", "other"]).required("required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth must be in the past")
    .required("Date of birth is required")
    .typeError("Date of birth must be a valid date")
    .test("age", "You must be at least 16 years old", function (value) {
      const today = new Date();
      const dob = new Date(value);
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      return age >= 16;
    }),
});

export const JobseekerEducationSchema = Yup.object().shape({
  degree: Yup.string().required("required"),
  course: Yup.string().required("required"),
  institute: Yup.string().required("required"),
  graduationYear: Yup.date()
    .required("date must be in the past")
    .max(new Date(), "date must be in the past")
    .typeError("date must be a valid date"),
  location: Yup.string().required("required"),

  marksType: Yup.string().test({
    name: "requiredIfOtherFieldAvailable",
    test: function (this: Yup.TestContext, value) {
      const marksValue = this.parent.marksValue as string;
      return marksValue !== "" ? !!value : true;
    },
    message: "Marks Type is required when Marks Value is present",
  }),
  marksValue: Yup.string().test({
    name: "requiredIfOtherFieldAvailable",
    test: function (this: Yup.TestContext, value) {
      const marksType = this.parent.marksType as string;
      return marksType !== "" ? !!value : true;
    },
    message: "Marks Value is required when Marks Type is present",
  }),
});

export const JobseekerExperienceSchema = Yup.object().shape({
  organizationName: Yup.string().required("Required"),
  organizationType: Yup.string().required("Required"),
  jobLocation: Yup.string().required("Required"),
  jobTitle: Yup.string().required("Required"),
  jobCategory: Yup.string().required("Required"),
  jobLevelId: Yup.string().required("Required"),

  startDate: Yup.string().required("Start time cannot be empty"),
  endDate: Yup
    .string()
    .required("End time cannot be empty")
    .test("is-greater", "End time should be greater", function (value) {
      const { startDate } = this.parent
      return moment(value).isAfter(moment(startDate));
    })
    .test("is-in-past", "End time should be in the past", function (value) {
      return moment(value).isBefore(moment());
    })
  ,
  duties: Yup.string().required("Required"),
});
