PGDMP      3            
    |         
   ruang_baca    16.0    16.0 !               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16453 
   ruang_baca    DATABASE     �   CREATE DATABASE ruang_baca WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE ruang_baca;
                postgres    false            �            1259    16454    account    TABLE     �  CREATE TABLE public.account (
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
    DROP TABLE public.account;
       public         heap    postgres    false            �            1259    41856 
   attendance    TABLE     �   CREATE TABLE public.attendance (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    barcode character varying(100) NOT NULL,
    scan_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    name character varying(50)
);
    DROP TABLE public.attendance;
       public         heap    postgres    false            �            1259    41855    attendance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.attendance_id_seq;
       public          postgres    false    224                       0    0    attendance_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.attendance_id_seq OWNED BY public.attendance.id;
          public          postgres    false    223            �            1259    16459    borrow    TABLE     U  CREATE TABLE public.borrow (
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
    DROP TABLE public.borrow;
       public         heap    postgres    false            �            1259    16464    borrow_id_seq    SEQUENCE     �   CREATE SEQUENCE public.borrow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.borrow_id_seq;
       public          postgres    false    216                       0    0    borrow_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.borrow_id_seq OWNED BY public.borrow.id;
          public          postgres    false    217            �            1259    16465    buku    TABLE     �  CREATE TABLE public.buku (
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
    DROP TABLE public.buku;
       public         heap    postgres    false            �            1259    16470    denda    TABLE     B   CREATE TABLE public.denda (
    nominal integer,
    text text
);
    DROP TABLE public.denda;
       public         heap    postgres    false            �            1259    16475    friend    TABLE     U   CREATE TABLE public.friend (
    name character varying,
    wa character varying
);
    DROP TABLE public.friend;
       public         heap    postgres    false            �            1259    16480    jurusan    TABLE     �   CREATE TABLE public.jurusan (
    id integer DEFAULT nextval('public.borrow_id_seq'::regclass),
    name character varying,
    photo text
);
    DROP TABLE public.jurusan;
       public         heap    postgres    false    217            �            1259    16486    return    TABLE     ^  CREATE TABLE public.return (
    id integer DEFAULT nextval('public.borrow_id_seq'::regclass),
    user_nisn character varying(20),
    book_isbn character varying(20),
    status character varying(100),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    due_date timestamp with time zone,
    borrow_id integer
);
    DROP TABLE public.return;
       public         heap    postgres    false    217            p           2604    41859    attendance id    DEFAULT     n   ALTER TABLE ONLY public.attendance ALTER COLUMN id SET DEFAULT nextval('public.attendance_id_seq'::regclass);
 <   ALTER TABLE public.attendance ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            m           2604    16490 	   borrow id    DEFAULT     f   ALTER TABLE ONLY public.borrow ALTER COLUMN id SET DEFAULT nextval('public.borrow_id_seq'::regclass);
 8   ALTER TABLE public.borrow ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            
          0    16454    account 
   TABLE DATA           �   COPY public.account (nisn, name, username, jurusan, password, wa, role, created_at, updated_at, access_token, refresh_token, profile, status) FROM stdin;
    public          postgres    false    215   l&                 0    41856 
   attendance 
   TABLE DATA           L   COPY public.attendance (id, username, barcode, scan_time, name) FROM stdin;
    public          postgres    false    224   ]1                 0    16459    borrow 
   TABLE DATA           y   COPY public.borrow (id, user_nisn, book_isbn, status, created_at, updated_at, due_date, pengembalian, denda) FROM stdin;
    public          postgres    false    216   2                 0    16465    buku 
   TABLE DATA           �   COPY public.buku (isbn, judul, penerbit, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, created_at, updated_at, jurusan, ready, penulis) FROM stdin;
    public          postgres    false    218   �4                 0    16470    denda 
   TABLE DATA           .   COPY public.denda (nominal, text) FROM stdin;
    public          postgres    false    219   �=                 0    16475    friend 
   TABLE DATA           *   COPY public.friend (name, wa) FROM stdin;
    public          postgres    false    220   X>                 0    16480    jurusan 
   TABLE DATA           2   COPY public.jurusan (id, name, photo) FROM stdin;
    public          postgres    false    221   �>                 0    16486    return 
   TABLE DATA           o   COPY public.return (id, user_nisn, book_isbn, status, created_at, updated_at, due_date, borrow_id) FROM stdin;
    public          postgres    false    222   -?                  0    0    attendance_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.attendance_id_seq', 14, true);
          public          postgres    false    223                       0    0    borrow_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.borrow_id_seq', 143, true);
          public          postgres    false    217            s           2606    41854    account account_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (username);
 >   ALTER TABLE ONLY public.account DROP CONSTRAINT account_pkey;
       public            postgres    false    215            y           2606    41862    attendance attendance_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_pkey;
       public            postgres    false    224            u           2606    16493    borrow borrow_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.borrow
    ADD CONSTRAINT borrow_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.borrow DROP CONSTRAINT borrow_pkey;
       public            postgres    false    216            w           2606    16495    buku buku_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_pkey PRIMARY KEY (isbn);
 8   ALTER TABLE ONLY public.buku DROP CONSTRAINT buku_pkey;
       public            postgres    false    218            z           2606    41868 #   attendance attendance_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_username_fkey FOREIGN KEY (username) REFERENCES public.account(username) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_username_fkey;
       public          postgres    false    215    4723    224            
   �
  x��Z[s��}���j^MqUy;���`P��TY�K�m.����g��t4�t'sz�Tw[EB�n���[�ZQ]�uR��n�����y�-n�-\��ny�q�vBp,����<�?�����O�I�����l��ͻ�I�����=b��ԭ�5��U0�F��@(�dM�c�/D�����zQ	t��4Pc���5ejS=��G�<�}cL������}�ͨ15�3���4�27�����KC�a�&�y��$\� $j��o�,X�礱A�!K�[��&
!5ݾ֎��l%ܞ�������ch�԰'qbcR(�h-���`r�8�NR�Ub��?pw��s����6d����	Թh+�s��*��h�a��@G}FLZ��˥*/,Շ�(��A<y��h��b2׆E�q�@	a�u��>a�ѩ�$I�������/�'1��	�.��k��)�C�	[��+�I�ѥ�D-x�M���3P��Y1M���hĉRK[�~Ыv���Z�V�C�yX/����eϲ�--ݜ�t�&f�^_ nvp��/��=|����4٧�5�����s�nRB�1�$v�t����.��I��kw� /8��S_ֈ�V�֔�,�O�8BU@�@�[�_*@E ;�3P�S>�t�U�xg3ߜ�	�}蜫.�mTQ�F���8מWx�p�B�Z�+o�*�L�-�<h��9�3���[��,)M�JBk��_�T��@K<�w�fB�3�(��}��x
�*/r�.t2�2<�R���qk�>h�3n�e5�W�`�[ӊ*?<�Ǎ���xb��>v&y��5!qW�y��E�Fp�p�4��L|LfZ�^Ќ��@���4��oǇ�A]���Q�N��������_����6��H�_A���Έ�[fz�j�T�i��ͱ�[R����$g�[mi�Y�>&�Q�G�#�q�gáe���t�*8�V���9ձ!���ةY'M�Ѿ7�SeH�H(���	�$)�S��)�A�*!H����Q�@RϤC������Et����3ш2�Nߏ�Ua(��]�6	}3�����v�x�p���$���̎�7������o%Rv]�6)��G�O�Ͻn�6������}�U�82��C�/��P�Uo�!9>"���]����}�g"'?1����_�F��Og�x��9�-
�ds��i��CoQ�h�qҲ�\���J-�FA���������e��Xe�ݗ���̍�M k�gOO�A���G�E�p{�n���q[;	3�h��ʙ���^ԣ�s�5�$L]ԋ���e�r�T�*��KۈD
s���ie����tǧ���16�G��cݓch9�WƬUe��3f{���z���_�z�������C�+	]�s4ݝ�(ޝ�O�A��G_����"����;�F��`oŚ��b��>䐪V�Ph�S�ݾ��vW�s��˟��C�C]�J���Q()D�N��������-��V�j�4��}���I�1��W�)��l��ƋA��G1I	�K�H��������)���:��8��qҮ\];M�α�����04N�x���?$ghL#L��`�܌�flf}��랰�"4��4�uf�#T;�gLi�ok�I``�s߹�n���Eo��;K�3�#�"Pwf���Cύ��aN" c�VO��؄����MJ�~�Z�+aZE�8j�yqF���TOӳ<��(͖>'���3W�w*����t��I����A�Y��Wv�|r��ki��>�:��iO�
�X_�
҈umܛittש(��C9�M�$��\���7�s���_��An�F�[mn���h�-h�ܳ�}ߜ��F��q��PN�*�Jo��5��'�x �?�+~>.�5-��Z�����h^��K����cS���5�4� �ډ�:5�yn�)g���[�0�������¤�w�C\������2n�O�&m�
`����h3�z�P(<'���B��fy�F5�� �?D�0�PY	��mT�D�EM]ig����9��Mc����؃��J����ڈe=1��4���Z�{Z�m���䖁e��[��v��>&^�������qwX�Ǜ�m��:�C�k�J)q"_�z¾�f؃��Z�z�ǰ"V5,��`��c2E���l��D�� J|�[g�j�W�2%n�����G�C����GY�CJ)�~>��y���͎�Oդ�*u����W�L9��V���h\���m�%;�8\�|���|�H���|��o��j����M�wf/��\�Unڲ���)t�q�r�Bċ�4����+�͚���&��M�]���{�wh	����O\Q�]䲃��� ��!�E�E��sw��_�n����gץ���if��-N6r������8����wpt�s�S�N�=g0���g��(?�}non�\<;~�ɓ�+Z����}�`'.앓p�e��H_fL ������x��	��g'Ϩy�
�C*iUX\�vr�}�Y8�֪��0��1�����k���Nd�Ѿzk � ���.�9H�/0܌����w"k����{�D�����p���G ��<(�P5�=7?�ȝ)����&^�qf-7���^i��G��O������t�v���GP�v"֝�O\?B=z�#r��Ջ�$r�N�wLA�o����?@�L���C!	9B�G1�`��BƢո�^��W_����~?>���_�#�7����w���|����_��-p         �   x��ϱ
�@�����@�rI�j6��9]�����"�_A���ޖ����7���6�ݽ�a���x�cu��:�@,\i~�
Y	��45����ʤ�2�a�2�<�+�%��ud�`�>��g����		��ҲZԒZ�j^\{�&�Y����         l  x���ˎ�0E���Ū��;$f��EÎZh$z��)��!vܝmY��z��0 ���^~<�O^Χ�����������p�'�	pD�8&a#߁o���N�%�9|~�u>�8D�L٣nHnD�D�e6T)ˑK�a��$ X�9����1�$	&��S�|�Ij��+*��|�����H��`�l��6�*�
O���	Z~4��O�}B\a����ٴ�'��%,�L@�]�<un)���N�*VṈ�O��y�c���%��L�+Bg��Z��Hg�]���[X-o�M�A��d��)7��@ճ��g�^�X�o|�A�0�6н0�`��!W�f��L*=��V��2�kx�8]L�ai{��!W�nq&�9���H`��a���7H�Oj�6{���\8�<9�]$�sR�lE�����Y����O�
���]&� It'Z�dc��Ȑ[��h�o�o&�̿�c=����Y������D<��m��9��ǫE�µ�n�0���?YH�ɘ5��~%��9���L�!�����ry�P�~��.M\�Ux^���J�>v�
v���Vnn��� ���;��;�)u9�3\�_l~�J-!f�7s8�x�+         B	  x��XMs�8=;���g�d�$�>M%��$U�Vv<3{�"!10 (E�~�k���$���H�ׯ_7�\�,�Wg��Τ�lR�A�Mʛh|}�{ԭ��>[-V���j�:[������bqw�\�n77׷��7�.o����hZe�Է�.D�lV��g�
>�*��G�k��TY�U�Y<L����>��Vٴ^�����{�U���k�W&�F�z���~��\�q���V�1�IE˿o�me����ն����%�;�a�����'��MD��'��[����!���ϓa�%�v��au�Rp�V6���Sj�2��69�ૹz۫����	��P۠��V}��[Z@`�wH,��mk|�G�dg��:��4"@5p��]�g��H�q�}��\}jt49�vc:���V�
fӀ�5i�^���FuQ��P����I�JH�Wv���(���������U�te"���C�:��#��v@�m���s�����T�[�	��f-�r&����x�GE;Z8Vwm׈�NS��Ǟo3�z��^�QnM,�y�xw���CB	�����luJZe� �$9�M���#������߿������}����L�����T8�����1YA�C� �{h���PWLj�3�Am���)z��S<Eߺ�c��d�z zZՓ�aK���k0@�j���Ŕփ,8/�#�x�BT*6B@�yAb��^���;���D$��>�"a8�����S��h#�Jx9?]@��Y����h@��e�tlq6�R���HY�#�co};W�P��S�c�#`!m�����:B�K��T�G�I�r�\^,��^^�����GpB�d�pͲ���n��/��˳�4�#��ޤg�����	Σ��jqw���Z^\�^ݮnV���/�8���<���0[L�l�����&d���xe���������������s�GV������c�>����b�fj��m4]�}�� ��V[�$:#Q�
H�؉�dL���9����5^���Y"L}d�ר�H|�[UQ�"H7SkU)Hd���`{���:�b� ��^�\��[Dy@
U�����{8��
a+����f����Fn#\��L�G\���)M�F�r
y���2h��r�G���lm�c4r����6y/�c��k�:�O0���r��d[tL�p�>'m�Os�r���!f��ȕ�����-2�G��:B�5\��C�0PM�)K�4*�*is`"��,q(���2e�8��$g�-���,��F^"h��"�Y�|�XxJ0�l)t�?��@t]`�@�b��~��1�̦hyw>#�Y��[��2{�D���?*S��G�V*�7�>������i�gl�5�\�ij��
?�h�x�6����Z���}�2$��,��g>,��d�F��P�.Ș��h4��,a{�%� ��/5K�E�u��N��_��b�M�.���P�׉��� <�n����4�BFV'�x`���ߜ5��sbP�pZ�m�B�-,�h02�rh>[�3�J�� 3��%uu��ܟ�@Y-��
����N@?V��2S=�V��.���b���t����C�!����T��o��=����fTqQ��N#+��!��ɷǬĬ�.�<��4rC�-rU	;/4�`��񘱫�Z�����:K#$Է2O'	˘JDPȵ�/�˕�R�/��em�?�=��7M�E4s��������[����k���Y�+�x��!L�N�/���QP@N�"j0C�2�Q�ɍ��(R<LT��X 3�|`eDߘ"S��R���g���?��Spt�`�ӈ��"�5�ߪ�`}�*R?��L7Я�+��q��Fn؞2�!�n��>����T%���Iv�7N�-�v!`	m��-�cգ"I e�.�P?�WNP8���m��L��TXA�+��T���|^Cw�>���8N���ꝶ�$/;�4�����L�f#M���
c1E�$A��Lg�`�(Y%��1�#\0χi����6�D�v��Q�����AF�����<�M|kF�+�k�,3˴k���$ñ�u]�Iǝ+�$��#����Ů8߆{O�y�U/��� ��`ȁ����k�%�~�����+�9:y�C�@���!�b��ݣp?W�v-Ȣ�QQ_oz����2h�W�(��B�������KY:��Np.�b�/�߯3(�&H����|7��!P�2���/�N�]���$������Q�çkR����r}�(��<\>ds��\B��?��9��D��ū�O"�����r�����ŋ�O�t         v   x�E�A
B1е=�@D���Li��O��E����p���r;�R�WV:2�M$-�a3Wڦ�W�aI|��&��^�>f���U��R$jVDvnx��i�դ&����}��8�>�3'         /   x���M��4��4360525�0�*�L������q��qqq �/	         �   x�}���0Eq�Ec��ԩ]8���������zU����=�ؑ���e4ǲ�u�?rȀ�g����� K;�h�7�T4��|��mM�94�X��Q�L���C����l.i�K�{�K% Q`�a���S����o�6n           x����n�0���S�^h03.�@{R4E��r���bF��j��ԉA�緾����"ڎ��^��������1��v��c���I�_���������� ��(�kb)���=D�i�^��F�pw�����r�uR����j��� �q5:�8��ɀ�P�3i�s�]��~jti�)���I�ܰdQ7 �c	/�.��u��L���������
i�;��y?^f�T=XH3�Qk����r��hE;�<�²�i����}��Hc$������a��pZ���?��x���XY�T��,Q���N�mm.��A��N��4����t�tK�.��ы\�kg�X÷pZ�\)����|��H��o�ν�݂)��@���ɀ�k�mᓅ�7! 7����gN�����aB#�,Ί�Y��d1^��4c����U�[���2>gᔤu���$BU�'���apō1Kz�P������|bt��[M:",��v�
�>������F     