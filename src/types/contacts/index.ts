export interface ContactField {
  label: string;
  modifier: string;
  value: string;
  is_primary: boolean;
}

export interface Contact {
  id: string;
  fields: {
    "first name"?: ContactField[];
    "last name"?: ContactField[];
    email?: ContactField[];
  };
  avatar_url: string;
  tags: { id: string; tag: string }[];
  created: string;
  updated: string;
}
