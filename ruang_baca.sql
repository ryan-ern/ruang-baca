--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2025-02-20 13:17:58

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

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16454)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    nisn character varying(20) NOT NULL,
    name character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    jurusan character varying(50) NOT NULL,
    password character varying(15) NOT NULL,
    wa character varying(14) NOT NULL,
    role character varying(20) NOT NULL,
    created_at date,
    updated_at date,
    access_token text,
    refresh_token text,
    profile text,
    status character varying
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 41856)
-- Name: attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    barcode character varying(100) NOT NULL,
    scan_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    name character varying(50)
);


ALTER TABLE public.attendance OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 41855)
-- Name: attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attendance_id_seq OWNER TO postgres;

--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 222
-- Name: attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attendance_id_seq OWNED BY public.attendance.id;


--
-- TOC entry 216 (class 1259 OID 16459)
-- Name: borrow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.borrow (
    id integer NOT NULL,
    user_nisn character varying(20),
    book_isbn character varying(20),
    status character varying(100),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    due_date timestamp with time zone,
    pengembalian character varying,
    denda integer
);


ALTER TABLE public.borrow OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16464)
-- Name: borrow_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.borrow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.borrow_id_seq OWNER TO postgres;

--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 217
-- Name: borrow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.borrow_id_seq OWNED BY public.borrow.id;


--
-- TOC entry 218 (class 1259 OID 16465)
-- Name: buku; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buku (
    isbn character varying(100) NOT NULL,
    judul character varying(40),
    penerbit character varying(40),
    tahun_terbit character varying(4),
    jumlah_halaman integer,
    stok_buku integer,
    cover text,
    sinopsis text,
    created_at date,
    updated_at date,
    jurusan character varying,
    ready integer,
    penulis character varying(20)
);


ALTER TABLE public.buku OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16470)
-- Name: denda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.denda (
    nominal integer,
    text text
);


ALTER TABLE public.denda OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16480)
-- Name: jurusan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jurusan (
    id integer DEFAULT nextval('public.borrow_id_seq'::regclass),
    name character varying,
    photo text
);


ALTER TABLE public.jurusan OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16486)
-- Name: return; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.return (
    id integer DEFAULT nextval('public.borrow_id_seq'::regclass),
    user_nisn character varying(20),
    book_isbn character varying(20),
    status character varying(100),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    due_date timestamp with time zone,
    borrow_id integer
);


ALTER TABLE public.return OWNER TO postgres;

--
-- TOC entry 4716 (class 2604 OID 41859)
-- Name: attendance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance ALTER COLUMN id SET DEFAULT nextval('public.attendance_id_seq'::regclass);


--
-- TOC entry 4713 (class 2604 OID 16490)
-- Name: borrow id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow ALTER COLUMN id SET DEFAULT nextval('public.borrow_id_seq'::regclass);


--
-- TOC entry 4870 (class 0 OID 16454)
-- Dependencies: 215
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (nisn, name, username, jurusan, password, wa, role, created_at, updated_at, access_token, refresh_token, profile, status) FROM stdin;
Vel dolores ipsum r	Autem sed ad ut impe	javucu	-	Pa$$w0rd!	08123456789	Super Admin	2023-11-27	2023-11-27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiVmVsIGRvbG9yZXMgaXBzdW0gciIsIm5hbWUiOiJBdXRlbSBzZWQgYWQgdXQgaW1wZSIsInVzZXJuYW1lIjoiamF2dWN1IiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4MTIzNDU2Nzg5Iiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzAxMDc0NjM1LCJleHAiOjE3MDExNjEwMzV9.e_vJyJM5-3NR0_YclAsuAkPZDlXEkTNVJEveUPHkD08	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiVmVsIGRvbG9yZXMgaXBzdW0gciIsIm5hbWUiOiJBdXRlbSBzZWQgYWQgdXQgaW1wZSIsInVzZXJuYW1lIjoiamF2dWN1IiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4MTIzNDU2Nzg5Iiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzAxMDc0NjM1LCJleHAiOjE3MzI2MzIyMzV9.NK2ohXQuVQKbVhl1lI4Q040-aMamDPG2zBLWBm3rW8s	default.jpg	\N
0000	winnny	winny	-	1234567890	08963052522	Super Admin	2023-11-16	2023-11-27	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMDAwMCIsIm5hbWUiOiJ3aW5ubnkiLCJ1c2VybmFtZSI6Indpbm55IiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYzMDUyNTIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzAxOTIzNzIzLCJleHAiOjE3MzM0ODEzMjN9.RK9n37RoL-bcpT0kLer3alZeWH0MpH-6Iaepte4nhuw	winny-1701090153644-487142979.jpg	\N
Et nulla magni incid	Voluptate ab nihil c	zadagixev	-	Pa$$w0rd!	08123456789	Super Admin	2023-11-27	2023-11-27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiRXQgbnVsbGEgbWFnbmkgaW5jaWQiLCJuYW1lIjoiVm9sdXB0YXRlIGFiIG5paGlsIGMiLCJ1c2VybmFtZSI6InphZGFnaXhldiIsImp1cnVzYW4iOiItIiwid2EiOiIwODEyMzQ1Njc4OSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcwMTA3NDcwNiwiZXhwIjoxNzAxMTYxMTA2fQ.7eJdxHIrh9SkpwAqnkyFCDjIDwrsr0ysX3ngp1ogoE4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiRXQgbnVsbGEgbWFnbmkgaW5jaWQiLCJuYW1lIjoiVm9sdXB0YXRlIGFiIG5paGlsIGMiLCJ1c2VybmFtZSI6InphZGFnaXhldiIsImp1cnVzYW4iOiItIiwid2EiOiIwODEyMzQ1Njc4OSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcwMTA3NDcwNiwiZXhwIjoxNzMyNjMyMzA2fQ.KLwBrOm7GrbGw4szhjtrdgEB6i4zF1nY8kGqmdDE3vs	default.jpg	\N
000	Imam Windharko	win	-	1234567890	0899999999	admin	2023-11-17	2023-11-22	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMDAwIiwibmFtZSI6IkltYW0gV2luZGhhcmtvIiwidXNlcm5hbWUiOiJ3aW4iLCJqdXJ1c2FuIjoiLSIsIndhIjoiMDg5OTk5OTk5OSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTA5NzQ1MCwiZXhwIjoxNzAxMTgzODUwfQ.Gip3zv6hbNk1V4NK9nR_K8cNOEbZqm38kmhkPBYddIA	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMDAwIiwibmFtZSI6IkltYW0gV2luZGhhcmtvIiwidXNlcm5hbWUiOiJ3aW4iLCJqdXJ1c2FuIjoiLSIsIndhIjoiMDg5OTk5OTk5OSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTA5NzQ1MCwiZXhwIjoxNzMyNjU1MDUwfQ.XA4sEFyVKRrehEVdcl1FF6mdyAdoowBq-DmoU84H3lI	\N	\N
11223344	syafira wulandari	syafira	Akuntansi	123456	0877278348442	siswa	2023-12-08	2023-12-08	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMTEyMjMzNDQiLCJuYW1lIjoic3lhZmlyYSB3dWxhbmRhcmkiLCJ1c2VybmFtZSI6InN5YWZpcmEiLCJqdXJ1c2FuIjoiQWt1bnRhbnNpIiwid2EiOiIwODc3Mjc4MzQ4NDQyIiwicm9sZSI6InNpc3dhIiwiaWF0IjoxNzAyMDE2NTI1LCJleHAiOjE3MDIxMDI5MjV9.nS8UcVgTg2j3CvODUF1Vjqe3AkvGqwp8HMEQf9iY0HM	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMTEyMjMzNDQiLCJuYW1lIjoic3lhZmlyYSB3dWxhbmRhcmkiLCJ1c2VybmFtZSI6InN5YWZpcmEiLCJqdXJ1c2FuIjoiQWt1bnRhbnNpIiwid2EiOiIwODc3Mjc4MzQ4NDQyIiwicm9sZSI6InNpc3dhIiwiaWF0IjoxNzAyMDE2NTI1LCJleHAiOjE3MzM1NzQxMjV9.F4e6sDQp1b40EQZJL_WII1lgKw1gMYZ92xWp_1LKBAo	default.jpg	blokir
Ab placeat voluptat	Quod voluptatibus qu	gyhypem	-	Pa$$w0rd!	08123456789	Super Admin	2023-11-27	2023-11-27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiQWIgcGxhY2VhdCB2b2x1cHRhdCIsIm5hbWUiOiJRdW9kIHZvbHVwdGF0aWJ1cyBxdSIsInVzZXJuYW1lIjoiZ3loeXBlbSIsImp1cnVzYW4iOiItIiwid2EiOiIwODEyMzQ1Njc4OSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcwMTA4OTE5NywiZXhwIjoxNzAxMTc1NTk3fQ.x8jRnfOcXyLlasueCx-cTF0ArFB4lhKGvy-QIY8Z8Eg	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiQWIgcGxhY2VhdCB2b2x1cHRhdCIsIm5hbWUiOiJRdW9kIHZvbHVwdGF0aWJ1cyBxdSIsInVzZXJuYW1lIjoiZ3loeXBlbSIsImp1cnVzYW4iOiItIiwid2EiOiIwODEyMzQ1Njc4OSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcwMTA4OTE5NywiZXhwIjoxNzMyNjQ2Nzk3fQ.qcvpQXzrAUhwhS5O_HMC_1EsKLd4XONwiddvZe_M9Ug	default.jpg	\N
0005	winnny	iyam	lainnya	1234567890	08963052522	siswa	2023-11-20	2023-12-07	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMDAwNSIsIm5hbWUiOiJ3aW5ubnkiLCJ1c2VybmFtZSI6Iml5YW0iLCJqdXJ1c2FuIjoibGFpbm55YSIsIndhIjoiMDg5NjMwNTI1MjIiLCJyb2xlIjoic2lzd2EiLCJpYXQiOjE3MDIwMjg2MjEsImV4cCI6MTczMzU4NjIyMX0.qIOfe_iqiAulx-AwQOLUzWBl169FreD6Kg9ZHsFOrZI	iyam-1700487172540-499328239.jpg	\N
Eos beatae officia p	Distinctio Qui cons	vyborava	-	Pa$$w0rd!	089513116506	Super Admin	2023-11-27	2023-11-27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiRW9zIGJlYXRhZSBvZmZpY2lhIHAiLCJuYW1lIjoiRGlzdGluY3RpbyBRdWkgY29ucyIsInVzZXJuYW1lIjoidnlib3JhdmEiLCJqdXJ1c2FuIjoiLSIsIndhIjoiMDg5NTEzMTE2NTA2Iiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzAxMDc1MDI4LCJleHAiOjE3MDExNjE0Mjh9.-emfnM99xM2iaYOowfl-9c2bT6ACSo3ASFCOLJwIGwk	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiRW9zIGJlYXRhZSBvZmZpY2lhIHAiLCJuYW1lIjoiRGlzdGluY3RpbyBRdWkgY29ucyIsInVzZXJuYW1lIjoidnlib3JhdmEiLCJqdXJ1c2FuIjoiLSIsIndhIjoiMDg5NTEzMTE2NTA2Iiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzAxMDc1MDI4LCJleHAiOjE3MzI2MzI2Mjh9.PwWVgWXprkyaMNHLhENAWMdvpeW5_VEno5XftghDohY	default.jpg	\N
1243	indra	indra	AK	indra	089513116506	siswa	2023-11-18	2024-11-24	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMTI0MyIsIm5hbWUiOiJpbmRyYSIsInVzZXJuYW1lIjoiaW5kcmEiLCJqdXJ1c2FuIjoiQUsiLCJ3YSI6IjA4OTUxMzExNjUwNiIsInJvbGUiOiJzaXN3YSIsImlhdCI6MTc0MDAyNzYyNCwiZXhwIjoxNzQwMDM2MjY0fQ.k1JnxFtCbrosxv8FO6ADPjE_yl8-PoqwyMty3CfRLsY	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMTI0MyIsIm5hbWUiOiJpbmRyYSIsInVzZXJuYW1lIjoiaW5kcmEiLCJqdXJ1c2FuIjoiQUsiLCJ3YSI6IjA4OTUxMzExNjUwNiIsInJvbGUiOiJzaXN3YSIsImlhdCI6MTc0MDAyNzYyNCwiZXhwIjoxNzQwMDM2MjY0fQ.k1JnxFtCbrosxv8FO6ADPjE_yl8-PoqwyMty3CfRLsY	\N	\N
0001	Imam windharko	imam	lainnya	1234567890	089630525481	siswa	2023-11-18	2023-12-07	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMDAwMSIsIm5hbWUiOiJJbWFtIHdpbmRoYXJrbyIsInVzZXJuYW1lIjoiaW1hbSIsImp1cnVzYW4iOiJJVEVSQSIsIndhIjoiMDg5NjMwNTI1NDgxIiwicm9sZSI6InNpc3dhIiwiaWF0IjoxNzAwOTkxMTg4LCJleHAiOjE3MzI1NDg3ODh9.PmwI5MaOKyi7BS8GgDVsU41pMDNeRTlAeEHk3xGky3A	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMDAwMSIsIm5hbWUiOiJJbWFtIHdpbmRoYXJrbyIsInVzZXJuYW1lIjoiaW1hbSIsImp1cnVzYW4iOiJsYWlubnlhIiwid2EiOiIwODk2MzA1MjU0ODEiLCJyb2xlIjoic2lzd2EiLCJpYXQiOjE3MDE5MzE0MTMsImV4cCI6MTczMzQ4OTAxM30.QrOuQYC-TCowSMuyCj0Fga4J17z7Jx4KMq5U_SlHFkQ	\N	unblokir
0004	Imam windharko	winwin	lainnya	1234567890	089630525481	siswa	2023-11-20	2023-12-07	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMDAwNCIsIm5hbWUiOiJJbWFtIHdpbmRoYXJrbyIsInVzZXJuYW1lIjoid2lud2luIiwianVydXNhbiI6IklURVJBIiwid2EiOiIwODk2MzA1MjU0ODEiLCJyb2xlIjoic2lzd2EiLCJpYXQiOjE3MDEyODU4MDQsImV4cCI6MTczMjg0MzQwNH0.cEcW6BAgPvjw2OylsRltYYAV-9p3gKw6dPnT7QNUkdQ	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMDAwNCIsIm5hbWUiOiJJbWFtIHdpbmRoYXJrbyIsInVzZXJuYW1lIjoid2lud2luIiwianVydXNhbiI6ImxhaW5ueWEiLCJ3YSI6IjA4OTYzMDUyNTQ4MSIsInJvbGUiOiJzaXN3YSIsImlhdCI6MTcwMTkzMTQyNywiZXhwIjoxNzMzNDg5MDI3fQ.r5IJiL-cz_FcxwD-VUy65Q2OguOZQpm8bm0RjkCuaC8	default.jpg	\N
123	test	test	Akuntansi	test	081234567890	siswa	2023-12-08	2023-12-08	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiMTIzIiwibmFtZSI6InRlc3QiLCJ1c2VybmFtZSI6InRlc3QiLCJqdXJ1c2FuIjoiQWt1bnRhbnNpIiwid2EiOiIwODEyMzQ1Njc4OTAiLCJyb2xlIjoic2lzd2EiLCJpYXQiOjE3MDIwMjg4MjgsImV4cCI6MTczMzU4NjQyOH0.mt29nzgXeomxgsRzR37qJJzjGRZYSIegUyqIhd5NaoI	default.jpg	-
Esse minim molestiae	Ea possimus ullam i	hycezavu	-	Pa$$w0rd!	089513116506	Super Admin	2023-11-27	2023-11-27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiRXNzZSBtaW5pbSBtb2xlc3RpYWUiLCJuYW1lIjoiRWEgcG9zc2ltdXMgdWxsYW0gaSIsInVzZXJuYW1lIjoiaHljZXphdnUiLCJqdXJ1c2FuIjoiLSIsIndhIjoiMDg5NTEzMTE2NTA2Iiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzAxMDc1MTIzLCJleHAiOjE3MDExNjE1MjN9.nQSbkKl8dVChl90xErP-uDjD0p_LBXLp9ildsuqJCJk	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiRXNzZSBtaW5pbSBtb2xlc3RpYWUiLCJuYW1lIjoiRWEgcG9zc2ltdXMgdWxsYW0gaSIsInVzZXJuYW1lIjoiaHljZXphdnUiLCJqdXJ1c2FuIjoiLSIsIndhIjoiMDg5NTEzMTE2NTA2Iiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzAxMDc1MTIzLCJleHAiOjE3MzI2MzI3MjN9.gPU2du84jaowsbEmF7_QzTPEUHjCgRVge-0QzaN4SYs	default.jpg	\N
-	Imam windharko	winner	-	1234567890	089630525481	admin	2023-11-17	2023-11-17	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	\N	\N
-	test	testa	-	@Passw0rd123!	08962222222	Super Admin	2023-11-27	2023-11-27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	default.jpg	\N
-	monkey	mimin	-	1234567890	08963052522	admin	2023-11-27	2023-11-27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	mimin-1701093203119-492590382.jpg	\N
-	superadmin	superadmin	-	@Passw0rd123!	08962222222	Super Admin	2023-11-18	2023-11-27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	\N	\N
-	admin	admin	-	@Passw0rd123!	0808	admin	2023-11-18	2023-11-27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXNuIjoiLSIsIm5hbWUiOiJzdXBlcmFkbWluIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwianVydXNhbiI6Ii0iLCJ3YSI6IjA4OTYyMjIyMjIyIiwicm9sZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQwMDI2NjEzLCJleHAiOjE3NDAwMzUyNTN9.97hjCbf0Imr1SIYykw32FP7PbdUjI68SwbCKJyzXPP0	\N	\N
\.


--
-- TOC entry 4878 (class 0 OID 41856)
-- Dependencies: 223
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance (id, username, barcode, scan_time, name) FROM stdin;
6	superadmin	LIBRARY_PRESENT:2024-11-28	2024-11-28 14:31:45	\N
7	superadmin	LIBRARY_PRESENT:2024-11-28	2024-11-28 14:33:38	superadmin
8	superadmin	LIBRARY_PRESENT:2024-11-28	2024-11-28 14:34:56	superadmin
9	superadmin	LIBRARY_PRESENT:2024-11-28	2024-11-28 14:36:39	superadmin
10	superadmin	LIBRARY_PRESENT:2024-11-28	2024-11-28 14:36:59	superadmin
11	superadmin	LIBRARY_PRESENT:2024-11-28	2024-11-28 14:37:34	superadmin
12	indra	LIBRARY_PRESENT:2024-11-28	2024-11-28 14:57:25	indra
13	indra	LIBRARY_PRESENT:2024-11-28	2024-11-28 15:03:04	indra
14	indra	LIBRARY_PRESENT:2024-11-28	2024-11-28 15:06:13	indra
\.


--
-- TOC entry 4871 (class 0 OID 16459)
-- Dependencies: 216
-- Data for Name: borrow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.borrow (id, user_nisn, book_isbn, status, created_at, updated_at, due_date, pengembalian, denda) FROM stdin;
88	12	Eligendi consectetur	SUKSES	2023-12-01 16:39:43.481+07	2023-12-01 16:40:52+07	2023-12-01 16:46:27+07	sukses	0
93	12	1861371441	SUKSES	2023-12-06 15:44:53.058+07	2023-12-06 15:46:07+07	2023-12-06 15:46:12+07	sukses	0
94	0005	126152	SUKSES	2023-12-07 11:34:48.968+07	2023-12-07 11:37:03+07	2023-12-07 11:37:24+07	sukses	0
95	12	126152	DITOLAK	2023-12-07 17:05:30.843+07	2023-12-07 17:06:47+07	2023-12-10 17:06:47+07	-	0
96	12	126152	DITOLAK	2023-12-07 17:06:19.215+07	2023-12-07 17:06:49+07	2023-12-10 17:06:49+07	-	0
98	12	126152	DITOLAK	2023-12-07 17:07:20.448+07	2023-12-07 17:10:01+07	2023-12-10 17:10:01+07	-	0
100	12	126152	DITOLAK	2023-12-07 17:18:53.352+07	2023-12-08 01:20:26+07	2023-12-11 01:20:26+07	-	0
99	12	126152	DITOLAK	2023-12-07 17:10:13.489+07	2023-12-08 01:20:30+07	2023-12-11 01:20:30+07	-	0
97	12	126152	SUKSES	2023-12-07 17:06:59.244+07	2023-12-07 17:07:07+07	2023-12-08 01:21:34+07	sukses	0
101	12	123	SUKSES	2023-12-08 01:20:37.125+07	2023-12-08 01:21:44+07	2023-12-08 01:22:23+07	sukses	0
102	12	123	SUKSES	2023-12-08 01:21:52.745+07	2023-12-08 01:21:59+07	2023-12-08 01:23:06+07	sukses	0
103	12	123	SUKSES	2023-12-08 01:22:03.371+07	2023-12-08 01:22:09+07	2023-12-08 01:23:08+07	sukses	0
104	12	123	DITOLAK	2023-12-08 01:22:30.206+07	2023-12-08 01:23:25+07	2023-12-11 01:23:25+07	-	0
92	0005	1861371441	SUKSES	2023-12-06 12:29:27.262+07	2023-12-06 15:40:16+07	2023-12-06 15:40:54+07	sukses	0
90	12	1861371441	SUKSES	2023-12-01 17:06:07.592+07	2023-12-06 15:40:19+07	2023-12-06 15:40:58+07	sukses	0
105	12	a	SUKSES	2023-12-08 03:39:26.924+07	2023-12-08 16:24:40+07	2023-12-11 16:24:40+07	-	0
109	11223344	123	SUKSES	2023-12-08 13:24:45.243+07	2023-12-08 16:24:38+07	2023-12-09 00:42:04+07	sukses	0
106	1243	126152	SUKSES	2023-12-08 11:06:31.97+07	2023-12-11 09:41:15+07	2023-12-11 09:41:19+07	sukses	0
91	0005	126152	SUKSES	2023-12-06 12:28:59.736+07	2024-09-23 10:45:59+07	2023-12-14 09:38:28+07	sukses	71000
108	1243	123	SUKSES	2023-12-08 11:07:37.984+07	2024-11-24 22:08:36+07	2024-07-04 08:42:10+07	sukses	36000
143	1243	126152	DITOLAK	2024-09-23 12:14:30.469+07	2024-11-24 22:08:46+07	2024-11-27 22:08:46+07	-	0
110	1243	126152	SUKSES	2023-12-08 17:02:47.541+07	2024-11-24 22:09:08+07	2024-09-26 10:46:08+07	sukses	14750
107	1243	123	SUKSES	2023-12-08 11:07:29.7+07	2025-02-20 12:46:42+07	2023-12-01 16:58:53+07	sukses	91250
144	1243	126152	SUKSES	2023-02-20 12:47:09.363+07	2025-02-20 12:47:23+07	2023-02-15 12:47:23+07	-	0
\.


--
-- TOC entry 4873 (class 0 OID 16465)
-- Dependencies: 218
-- Data for Name: buku; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buku (isbn, judul, penerbit, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, created_at, updated_at, jurusan, ready, penulis) FROM stdin;
123	Insecurityafs	Gramedia	2020	80	12	Insecurityafs-1701920952641-384826288.jpg	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\r\n\r\nWhy do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\r\n\r\n\r\nWhere does it come from?\r\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\r\n\r\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\r\n\r\nWhere can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.\r\n\r\n5\r\n\tparagraphs\r\n\twords\r\n\tbytes\r\n\tlists\r\n\tStart with 'Lorem\r\nipsum dolor sit amet...'\r\n	2023-12-07	2025-02-20	lainnya	12	Alvin Syahrin
126152	Loniless is my bestfrend	Gramedia	2020	1212	1	Loniless is my bestfrend-1700991228066-588567369.png	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Lectus magna fringilla urna porttitor. Consectetur adipiscing elit ut aliquam. Diam sollicitudin tempor id eu nisl nunc. Eu facilisis sed odio morbi quis commodo. Duis at tellus at urna condimentum. Diam ut venenatis tellus in metus vulputate eu scelerisque. Pharetra sit amet aliquam id diam maecenas ultricies. Aliquet nibh praesent tristique magna sit amet. Phasellus faucibus scelerisque eleifend donec. Ut placerat orci nulla pellentesque dignissim enim sit amet. Ut tellus elementum sagittis vitae et leo duis ut. Suscipit adipiscing bibendum est ultricies. Purus ut faucibus pulvinar elementum integer enim neque volutpat ac. Quis imperdiet massa tincidunt nunc pulvinar sapien et.\r\n\r\nNunc eget lorem dolor sed viverra. Morbi quis commodo odio aenean sed adipiscing. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Tincidunt dui ut ornare lectus sit amet est placerat in. Pellentesque adipiscing commodo elit at imperdiet. Pulvinar mattis nunc sed blandit libero volutpat sed. A lacus vestibulum sed arcu non odio. Sollicitudin aliquam ultrices sagittis orci. Euismod in pellentesque massa placerat duis ultricies lacus. Et sollicitudin ac orci phasellus. Et ultrices neque ornare aenean. Malesuada fames ac turpis egestas integer eget aliquet nibh. Hendrerit gravida rutrum quisque non. Varius duis at consectetur lorem donec. 	2023-11-26	2025-02-20	Akuntansi	3	Alvin Syahrin
\.


--
-- TOC entry 4874 (class 0 OID 16470)
-- Dependencies: 219
-- Data for Name: denda; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.denda (nominal, text) FROM stdin;
250	Peminjaman hanya dilakukan maksimal 3 buku dengan rentang waktu 3 hari, jika melebihi batas peminjaman maka akan dikenakan denda per hari
\.


--
-- TOC entry 4875 (class 0 OID 16480)
-- Dependencies: 220
-- Data for Name: jurusan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jurusan (id, name, photo) FROM stdin;
71	Akuntansi	Akuntansi-1701327094605-584807878.png
76	Teknik Komputer & Jaringan	Teknik Komputer & Jaringan-1701328495715-112877034.png
77	Pemasaran	Pemasaran-1701328514457-204600227.png
\.


--
-- TOC entry 4876 (class 0 OID 16486)
-- Dependencies: 221
-- Data for Name: return; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.return (id, user_nisn, book_isbn, status, created_at, updated_at, due_date, borrow_id) FROM stdin;
7	0005	1232-12323	PROSES	2023-11-26 01:09:58.307+07	2023-11-26 01:09:58.307+07	\N	\N
8	12	undefined	PROSES	2023-11-26 15:04:31.855+07	2023-11-26 15:04:31.855+07	\N	\N
9	12	undefined	PROSES	2023-11-26 15:05:56.4+07	2023-11-26 15:05:56.4+07	\N	\N
10	12	In reprehenderit re	PROSES	2023-11-26 15:12:40.136+07	2023-11-26 15:12:40.136+07	\N	\N
11	12	In reprehenderit re	PROSES	2023-11-26 15:28:13.728+07	2023-11-26 15:28:13.728+07	\N	\N
12	0001	1232-12323	PROSES	2023-11-26 15:35:14.851+07	2023-11-26 15:35:14.851+07	\N	\N
13	12	In reprehenderit re	PROSES	2023-11-26 16:02:48.899+07	2023-11-26 16:02:48.899+07	\N	\N
14	12	In reprehenderit re	PROSES	2023-11-26 16:05:24.463+07	2023-11-26 16:05:24.463+07	\N	\N
15	12	In reprehenderit re	PROSES	2023-11-26 16:07:07.215+07	2023-11-26 16:07:07.215+07	\N	\N
16	1243	In reprehenderit re	PROSES	2023-11-26 16:28:52.544+07	2023-11-26 16:28:52.544+07	\N	\N
20	004	126152	PROSES	2023-11-27 21:54:12.9+07	2023-11-27 21:54:12.9+07	\N	\N
18	12	126152	SUKSES	2023-11-27 20:19:16.668+07	2023-11-28 22:14:35+07	2023-12-01 22:14:35+07	\N
26	12	126152	DITOLAK	2023-11-28 22:53:22.999+07	2023-11-28 22:51:45+07	2023-12-01 22:51:45+07	\N
25	12	126152	DITOLAK	2023-11-28 22:52:44.249+07	2023-11-28 22:55:56+07	2023-12-01 22:55:56+07	\N
2	0001	126152	DITOLAK	2023-11-15 00:00:00+07	2023-11-28 23:11:13+07	2023-12-01 23:11:13+07	\N
1	0001	126152	SUKSES	2023-11-15 00:00:00+07	2023-11-28 23:28:09+07	2023-12-01 23:28:09+07	\N
24	12	126152	SUKSES	2023-11-28 22:50:42.085+07	2023-11-28 23:30:34+07	2023-12-01 23:30:34+07	\N
23	12	126152	DITOLAK	2023-11-28 22:50:35.351+07	2023-11-28 23:30:43+07	2023-12-01 23:30:43+07	\N
22	0005	126152	DITOLAK	2023-11-27 22:05:10.02+07	2023-11-28 23:31:05+07	2023-12-01 23:31:05+07	\N
17	1243	126152	DITOLAK	2023-11-26 16:34:08.924+07	2023-11-28 23:32:00+07	2023-12-01 23:32:00+07	\N
19	12	126152	DITOLAK	2023-11-27 20:24:37.65+07	2023-11-29 01:07:10+07	2023-12-02 01:07:10+07	\N
27	1243	1861371441	SUKSES	2023-11-29 01:11:32.628+07	2023-11-29 01:16:21+07	2023-12-02 01:16:21+07	\N
61	\N	\N	-	2023-11-29 22:20:15.167+07	2023-11-29 22:20:15+07	2023-12-02 22:20:15+07	60
\.


--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 222
-- Name: attendance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attendance_id_seq', 14, true);


--
-- TOC entry 4887 (class 0 OID 0)
-- Dependencies: 217
-- Name: borrow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.borrow_id_seq', 144, true);


--
-- TOC entry 4719 (class 2606 OID 41854)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (username);


--
-- TOC entry 4725 (class 2606 OID 41862)
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- TOC entry 4721 (class 2606 OID 16493)
-- Name: borrow borrow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow
    ADD CONSTRAINT borrow_pkey PRIMARY KEY (id);


--
-- TOC entry 4723 (class 2606 OID 16495)
-- Name: buku buku_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_pkey PRIMARY KEY (isbn);


--
-- TOC entry 4726 (class 2606 OID 41868)
-- Name: attendance attendance_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_username_fkey FOREIGN KEY (username) REFERENCES public.account(username) ON DELETE CASCADE;


-- Completed on 2025-02-20 13:17:58

--
-- PostgreSQL database dump complete
--

