--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Debian 11.5-1.pgdg90+1)
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: coins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coins (
    id integer NOT NULL,
    name character varying(50),
    symbol character varying(50),
    created_on timestamp without time zone NOT NULL
);


ALTER TABLE public.coins OWNER TO postgres;

--
-- Name: coins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coins_id_seq OWNER TO postgres;

--
-- Name: coins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coins_id_seq OWNED BY public.coins.id;


--
-- Name: coins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coins ALTER COLUMN id SET DEFAULT nextval('public.coins_id_seq'::regclass);


--
-- Data for Name: coins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coins (id, name, symbol, created_on) FROM stdin;
3	Etherium	ETH1	2019-09-23 16:12:44.899
\.


--
-- Name: coins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coins_id_seq', 5, true);


--
-- Name: coins coins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

