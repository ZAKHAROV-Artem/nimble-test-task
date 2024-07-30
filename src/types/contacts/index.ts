export interface ContactField {
  label: string;
  modifier: string;
  value: string;
}

export interface Contact {
  id: string;
  record_type: "person";
  fields: {
    "first name"?: ContactField[];
    "last name"?: ContactField[];
    email?: ContactField[];
  };
  owner_id: string | null;
  avatar_url: string;
  tags: { id: string; tag: string }[];
  created: string;
  updated: string;
  privacy: {
    read: string | null;
    edit: string | null;
  };
}
