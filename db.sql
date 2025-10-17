CREATE TABLE "public"."account_has_workspaces" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "account_id" uuid,
  "workspace_id" uuid,
  "is_default" bool DEFAULT false,
  "is_active" bool DEFAULT true,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_account_has_workspaces_id" PRIMARY KEY ("id")
);
ALTER TABLE "public"."account_has_workspaces" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "INDEX_account_has_workspace_account_id_workspace_id" ON "public"."account_has_workspaces" USING btree (
  "account_id",
  "workspace_id"
);

CREATE TABLE "public"."account_parameters" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "account_id" uuid,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "data" jsonb,
  "is_active" bool DEFAULT true,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_7be6761aa89e339353c87be1495" PRIMARY KEY ("id")
);
ALTER TABLE "public"."account_parameters" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "pk_account_parameters" ON "public"."account_parameters" USING btree (
  "id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "unique_account_id_name_deleted_at" ON "public"."account_parameters" USING btree (
  "account_id" "pg_catalog"."uuid_ops" ASC NULLS LAST,
  "deleted_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST,
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

CREATE TABLE "public"."account_phones" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "account_id" uuid,
  "country_code" varchar(5) COLLATE "pg_catalog"."default",
  "phone_number" varchar(20) COLLATE "pg_catalog"."default",
  "verified_at" date,
  "is_primary" bool,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_6779f85930da6de0cda54514637" PRIMARY KEY ("id"),
  CONSTRAINT "UQ_33409f44928f39805eb64d6497a" UNIQUE ("account_id"),
  CONSTRAINT "UQ_7ef683856b1fb861ae27ce9b969" UNIQUE ("phone_number")
);
ALTER TABLE "public"."account_phones" OWNER TO "bglightsoft";
CREATE INDEX "index_account_id" ON "public"."account_phones" USING btree (
  "account_id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "pk_account_phones" ON "public"."account_phones" USING btree (
  "id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "unique_account_id,phone_number,deleted_at" ON "public"."account_phones" USING btree (
  "account_id" "pg_catalog"."uuid_ops" ASC NULLS LAST,
  "deleted_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST,
  "phone_number" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

CREATE TABLE "public"."account_tokens" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "account_id" uuid NOT NULL,
  "type" varchar(255) COLLATE "pg_catalog"."default",
  "tokenable_id" uuid,
  "token" varchar(255) COLLATE "pg_catalog"."default",
  "expire_at" timestamp(6),
  "last_used_at" timestamp(6),
  "created_at" timestamp(6) DEFAULT now(),
  CONSTRAINT "PK_5e3640c493cc6206a44b885e6a9" PRIMARY KEY ("id")
);
ALTER TABLE "public"."account_tokens" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "pk_account_tokens" ON "public"."account_tokens" USING btree (
  "id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);

CREATE TABLE "public"."accounts" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "is_active" bool,
  "is_frozen" bool,
  "registration_status" varchar(255) COLLATE "pg_catalog"."default",
  "verified_at" timestamp(6),
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id")
);
ALTER TABLE "public"."accounts" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "account_id" ON "public"."accounts" USING btree (
  "id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);
CREATE INDEX "index_email" ON "public"."accounts" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "uniques_email_deleted_at" ON "public"."accounts" USING btree (
  "deleted_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST,
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

CREATE TABLE "public"."application_errors" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "type" varchar(255) COLLATE "pg_catalog"."default",
  "message" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT now(),
  "account_id" uuid,
  CONSTRAINT "PK_42d74b145e6ffcc62e1542de38f" PRIMARY KEY ("id")
);
ALTER TABLE "public"."application_errors" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "pk_application_errors" ON "public"."application_errors" USING btree (
  "id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);

CREATE TABLE "public"."audit_logs" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "interaction_types" varchar(255) COLLATE "pg_catalog"."default",
  "data" jsonb,
  "created_at" timestamp(6) DEFAULT now(),
  "account_id" uuid,
  CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id")
);
ALTER TABLE "public"."audit_logs" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "pk_audit_logs" ON "public"."audit_logs" USING btree (
  "id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);

CREATE TABLE "public"."credential_group_types" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "is_active" bool DEFAULT true,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_credential_group_type_id" PRIMARY KEY ("id")
);
ALTER TABLE "public"."credential_group_types" OWNER TO "bglightsoft";

CREATE TABLE "public"."credential_groups" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "credential_group_type_id" uuid,
  "credential_group_id" uuid,
  "workspace_id" uuid NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "is_active" bool DEFAULT true,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_credentia_groups_id" PRIMARY KEY ("id")
);
ALTER TABLE "public"."credential_groups" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "INDEX_credential_groups_workspace_id,credential_group_id" ON "public"."credential_groups" USING btree (
  "id",
  "credential_group_type_id",
  "credential_group_id",
  "workspace_id"
);

CREATE TABLE "public"."credential_parameter_list" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "credential_group_type_id" uuid,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "data" jsonb,
  "is_active" bool DEFAULT true,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_credential_parameter_list_id" PRIMARY KEY ("id")
);
ALTER TABLE "public"."credential_parameter_list" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "INDEX_credentials_id_credential_group_id" ON "public"."credential_parameter_list" USING btree (
  "id",
  "credential_group_type_id"
);

CREATE TABLE "public"."credential_parameters" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "credential_id" uuid,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "data" jsonb,
  "is_active" bool DEFAULT true,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_credential_parameters_id" PRIMARY KEY ("id")
);
ALTER TABLE "public"."credential_parameters" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "INDEX_credential_parameters_credential_id" ON "public"."credential_parameters" USING btree (
  "credential_id",
  "name"
);

CREATE TABLE "public"."credentials" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "credential_group_id" uuid,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "is_active" bool DEFAULT true,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_credentials_id" PRIMARY KEY ("id")
);
ALTER TABLE "public"."credentials" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "INDEX_credentials_credential_group_id" ON "public"."credentials" USING btree (
  "id",
  "credential_group_id"
);

CREATE TABLE "public"."otp_codes" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "account_id" uuid NOT NULL,
  "type" varchar(255) COLLATE "pg_catalog"."default",
  "code" varchar(255) COLLATE "pg_catalog"."default",
  "used_at" timestamp(6),
  "expire_at" timestamp(6),
  "created_at" timestamp(6),
  CONSTRAINT "PK_9d0487965ac1837d57fec4d6a26" PRIMARY KEY ("id")
);
ALTER TABLE "public"."otp_codes" OWNER TO "bglightsoft";
CREATE UNIQUE INDEX "pk_otp_codes" ON "public"."otp_codes" USING btree (
  "id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);

CREATE TABLE "public"."workspaces" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "is_active" bool DEFAULT true,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "deleted_at" timestamp(6),
  CONSTRAINT "PK_workpsace_id" PRIMARY KEY ("id")
);
ALTER TABLE "public"."workspaces" OWNER TO "bglightsoft";

ALTER TABLE "public"."account_has_workspaces" ADD CONSTRAINT "FK_account_has_workspace_account_id" FOREIGN KEY ("account_id") REFERENCES "public"."accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."account_has_workspaces" ADD CONSTRAINT "FK_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."account_parameters" ADD CONSTRAINT "FK_64629ca617efefcc4887dafb417" FOREIGN KEY ("account_id") REFERENCES "public"."accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."account_phones" ADD CONSTRAINT "FK_33409f44928f39805eb64d6497a" FOREIGN KEY ("account_id") REFERENCES "public"."accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."account_tokens" ADD CONSTRAINT "FK_870787de4c0e110e30ba3df237b" FOREIGN KEY ("account_id") REFERENCES "public"."accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."application_errors" ADD CONSTRAINT "FK_a00ba9c0b58e493e8b0193e3fbb" FOREIGN KEY ("account_id") REFERENCES "public"."accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."audit_logs" ADD CONSTRAINT "FK_0d25c7d5663afd2b4365caabeb2" FOREIGN KEY ("account_id") REFERENCES "public"."accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."credential_groups" ADD CONSTRAINT "FK_credential_groups_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."credential_groups" ADD CONSTRAINT "FK_credential_groups_credential_group_id" FOREIGN KEY ("credential_group_id") REFERENCES "public"."credential_groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."credential_groups" ADD CONSTRAINT "FK_credential_groups_credential_group_type_id" FOREIGN KEY ("credential_group_type_id") REFERENCES "public"."credential_group_types" ("id");
ALTER TABLE "public"."credential_parameter_list" ADD CONSTRAINT "FK_credentials_credential_group_id" FOREIGN KEY ("credential_group_type_id") REFERENCES "public"."credential_group_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."credential_parameters" ADD CONSTRAINT "FK_credential_parameters_credential_id" FOREIGN KEY ("credential_id") REFERENCES "public"."credentials" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."credentials" ADD CONSTRAINT "FK_credentials_credential_group_id" FOREIGN KEY ("credential_group_id") REFERENCES "public"."credential_groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."otp_codes" ADD CONSTRAINT "FK_537d1f37308f7d948e45dbb0f39" FOREIGN KEY ("account_id") REFERENCES "public"."accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

