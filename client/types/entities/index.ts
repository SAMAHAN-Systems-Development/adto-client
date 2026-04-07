export interface OrganizationParent {
  id: string;
  name: string;
  description: string;
  organizationChildren: OrganizationGroup[];
}

export interface OrganizationGroup {
  organizationParentId: string;
  organizationParent: OrganizationParent;
  organizationChildId: string;
  organizationChild: OrganizationChild;
}

export interface OrganizationChild {
  id: string;
  name: string;
  acronym?: string;
  icon?: string;
  email: string;
  password: string;
  description?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  isActive: boolean;
  isAdmin: boolean;
  events: Event[];
  organizationParents: OrganizationGroup[];
}

export interface Course {
  id: string;
  name: string;
  users: User[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  contactNumber: string;
  validId?: string;
  courseId: string;
  course: Course;
  isAlumni: boolean;
  batch?: number;
  isActive: boolean;
  registrations: Registration[];
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  paymentDate: Date;
  registrationId: string;
  registration: Registration;
}

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  yearLevel: string;
  course: string;
  cluster: string;
  confirmedAt?: Date;
  isAttended: boolean;
  hasRsvpd: boolean;
  organizationParentId?: string;
  organizationParent?: OrganizationParent;
  organizationChildId?: string;
  organizationChild?: OrganizationChild;
  ticketCategoryId: string;
  ticketCategory: TicketCategory;
  createdAt: Date;
  updatedAt: Date;
}

export enum TicketRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
}

export interface TicketRequests {
  id: string;
  ticketId: string;
  ticket: TicketCategory;
  orgId: string;
  org: OrganizationChild;
  createdAt: Date;
  updatedAt: Date;
  status: TicketRequestStatus;
  ticketLink?: string | null;
  declineReason?: string | null;
}

export interface TicketCategory {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  price: number;
  capacity: number;
  registrationDeadline: Date;
  eventId: string;
  event: Event;
  registrations: Registration[];
  availableCapacity?: number;
  ticketLinks?: string[];
}

export interface Event {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  banner?: string;
  dateStart: Date;
  dateEnd: Date;
  isRegistrationOpen: boolean;
  isRegistrationRequired: boolean;
  isOpenToOutsiders: boolean;
  isPublished?: boolean;
  isRsvpEnabled?: boolean;
  bannerImage?: string;
  venue?: string;
  orgId: string;
  org: OrganizationChild;
  TicketCategories: TicketCategory[];
  formQuestions: FormQuestions[];
}

export interface FormAnswers {
  id: string;
  answer: string;
  formQuestionId: string;
  formQuestion: FormQuestions;
  registrationId: string;
  registration: Registration;
}

export interface FormQuestionChoices {
  id: string;
  choice: string;
  formQuestionId: string;
  formQuestion: FormQuestions;
}

export interface FormQuestions {
  id: string;
  question: string;
  eventId: string;
  event: Event;
  formElementId: string;
  formElement: FormElements;
  formQuestionChoices: FormQuestionChoices[];
  formAnswers: FormAnswers[];
}

export enum FormElements {
  TEXT = "TEXT",
  TEXTAREA = "TEXTAREA",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  SELECT = "SELECT",
}
