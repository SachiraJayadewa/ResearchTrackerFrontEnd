
// Matches  backend enum
export enum ProjectStatus {
  PLANNING = "PLANNING",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED"
}

export interface User {
  id: string;
  username: string;
  fullName?: string;
  role?: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;       // Matches private String summary;
  status: ProjectStatus; // Matches private Status status;
  pi?: User;             // Matches private User pi;
  tags: string;
  startDate: string;     // string format for LocalDate
  endDate: string;
  createdAt?: string;
  members?: User[];      // Matches List<User> members;
}