/*
    This SQL code has been tested with PostgreSql, if you are using other
    relational DB, you should modify this code.
*/

/* Users table */

CREATE TABLE public.users
(
    id uuid NOT NULL,
    username character varying NOT NULL,
    authenticators character varying[] NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

/* Authenticator table */

CREATE TABLE public.authenticator
(
    id character varying[] NOT NULL,
    public_key character varying NOT NULL,
    counter character varying NOT NULL,
    CONSTRAINT authenticator_pkey PRIMARY KEY (id)
);

CREATE TABLE public.post
(
    id uuid NOT NULL,
    title character varying NOT NULL,
    text character varying NOT NULL,
    owner character varying NOT NULL,
    likes character varying NOT NULL,
    dislikes character varying NOT NULL,
    CONSTRAINT post_pkey PRIMARY KEY (id)
);
