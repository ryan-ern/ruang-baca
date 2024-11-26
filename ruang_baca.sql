PGDMP  "    &                {         
   ruang_baca    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24576 
   ruang_baca    DATABASE     �   CREATE DATABASE ruang_baca WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE ruang_baca;
                postgres    false            �            1259    24577    account    TABLE     �  CREATE TABLE public.account (
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
       public         heap    postgres    false            �            1259    57345    borrow    TABLE     U  CREATE TABLE public.borrow (
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
       public         heap    postgres    false            �            1259    57344    borrow_id_seq    SEQUENCE     �   CREATE SEQUENCE public.borrow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.borrow_id_seq;
       public          postgres    false    218            �           0    0    borrow_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.borrow_id_seq OWNED BY public.borrow.id;
          public          postgres    false    217            �            1259    49152    buku    TABLE     �  CREATE TABLE public.buku (
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
       public         heap    postgres    false            �            1259    98310    denda    TABLE     B   CREATE TABLE public.denda (
    nominal integer,
    text text
);
    DROP TABLE public.denda;
       public         heap    postgres    false            �            1259    122888    friend    TABLE     U   CREATE TABLE public.friend (
    name character varying,
    wa character varying
);
    DROP TABLE public.friend;
       public         heap    postgres    false            �            1259    106511    jurusan    TABLE     �   CREATE TABLE public.jurusan (
    id integer DEFAULT nextval('public.borrow_id_seq'::regclass),
    name character varying,
    photo text
);
    DROP TABLE public.jurusan;
       public         heap    postgres    false    217            �            1259    98326    return    TABLE     ^  CREATE TABLE public.return (
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
       public         heap    postgres    false    217            2           2604    65536 	   borrow id    DEFAULT     f   ALTER TABLE ONLY public.borrow ALTER COLUMN id SET DEFAULT nextval('public.borrow_id_seq'::regclass);
 8   ALTER TABLE public.borrow ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �          0    24577    account 
   TABLE DATA           �   COPY public.account (nisn, name, username, jurusan, password, wa, role, created_at, updated_at, access_token, refresh_token, profile, status) FROM stdin;
    public          postgres    false    215   �       �          0    57345    borrow 
   TABLE DATA           y   COPY public.borrow (id, user_nisn, book_isbn, status, created_at, updated_at, due_date, pengembalian, denda) FROM stdin;
    public          postgres    false    218   �&       �          0    49152    buku 
   TABLE DATA           �   COPY public.buku (isbn, judul, penerbit, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, created_at, updated_at, jurusan, ready, penulis) FROM stdin;
    public          postgres    false    216   �(       �          0    98310    denda 
   TABLE DATA           .   COPY public.denda (nominal, text) FROM stdin;
    public          postgres    false    219   R2       �          0    122888    friend 
   TABLE DATA           *   COPY public.friend (name, wa) FROM stdin;
    public          postgres    false    222   �2       �          0    106511    jurusan 
   TABLE DATA           2   COPY public.jurusan (id, name, photo) FROM stdin;
    public          postgres    false    221   3       �          0    98326    return 
   TABLE DATA           o   COPY public.return (id, user_nisn, book_isbn, status, created_at, updated_at, due_date, borrow_id) FROM stdin;
    public          postgres    false    220   �3       �           0    0    borrow_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.borrow_id_seq', 142, true);
          public          postgres    false    217            8           2606    57352    borrow borrow_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.borrow
    ADD CONSTRAINT borrow_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.borrow DROP CONSTRAINT borrow_pkey;
       public            postgres    false    218            6           2606    73751    buku buku_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_pkey PRIMARY KEY (isbn);
 8   ALTER TABLE ONLY public.buku DROP CONSTRAINT buku_pkey;
       public            postgres    false    216            �   �
  x��Zks���l�
�j������"��A��5U���AD��wcҙh�;ݙ�;�m�h�������:Q�N�4w���e��;lyt�n��]dw�c׏3��Si��^���k���/l�$E�C��)3'�v�'#�����ۡS�=����?���K�Pɚ��B_3]ϙ�P�t���Wc�����z��.�G��a��~1�=S۶��l}��Q��d׀��eix�۴?�6;}^�s�xJؚ�~�D�m]�LN����xN,%*B#M��Ըt�Y+f�]��H�-^�n�ZT^�Ѧ�}��,N,L
D抜��'�Y
�JlT���i^�E�GJkloX[�l���D:*�:�N��qN���X#p�Ĥ�z�\���T�Ί�1
�!œG�hFKm��6,:�����dn�7�S�#�(�V~b{(��'� ~\���M�� �o�߼���ގ�3�����H�Z8�>�-b�����۱8q�ո}=�彙/�<NBT�J :E����w�W��P��j�O�������>���`Kn	?��a�� #���PW�\�'_�ج&->_�q��*�E�*|��(�����4~�����(�i��Y�6v0x\�%�/�/DA��>����`�oFR���8�B�D]�Iآ���O��$K�̌i���t��8�֒"�ߒ��6���NR�1�����I��:]�L+S�p��$�v�6��l���Ɏ�xe��&$�c��d��z�p�S3`>�.w�&e�n��������5��숎N������kud#�?;��S����f�&Ϲ�6M�8���-�a���>�`\���Og�����;��AxO�{�}	�� mH��/�E�	�W |�ҸX�js�"
�^d����TQXR�X��_��YT8XRe����L�=ff{H�z:�¤ʋ��L�Oݔ�~t�����XV�|���+�h����.7��T3�c�؞p��N�TsQ*��R�#��ǗE
��C4�"�f�*�;���x� �K�uEEH��J	���W������8��L�|[¼��ͩ�R������/������!&�a셏#ö�߆Ci[\|�Ag�����b�;��V�O��خY;M�ѡ7��퐚���"f���)��'a��GT-OB|�r�2���=�����tA����Y�g�y~~BP�����g��c��Ozg���HY�^���ˀ�V��*�Ǽ�"`b}���um�+h5:�b�z�x��
��Y��l���˜��+��A(�	(�@p%f9�r��
�h�-�r����X��DA�w6Ƴ�p���A� H��:E���u�2B��r��;6,�#J
��%@�`HRC�"� &z������m
��&�6�"#oG�󈴵���PޫO$��v�]ܵ#n&k�L��ڪY�6���߽�W�	�~]���#���i�g8h1P��d3�Z���D@�O�+���O��ʆ3�����f��R#�`;�����/&r���ɻ�r�	��
wEc�g-���ňM�t���?�f7���c��R�u�2�__�fYteǭ�:s⿳p�5����g*d��0�3n��m6�e���1�0۝̙Z��C�E=:�weGF�Ń��n�T�ܭ.�5�pI�p�y��������3>�,e���tDEނ?�=Y0��!��Ș�6Z&����:e����֫��������Ҧ���`�v�^d�����kw"�65З:D�z"�J��I�n�˽�8V��1��O/=#�X���j�t��N���bDԴ��e�.�V�?��E��g�A����(���AX=9{��et�Znm�}f�;���ev�b��w�˶3����ASX�b�$���$t�N��w��W���"懷��yi5�F�8E�F��VcZtM+�tӧ'��Q7�L���'��O�r�w�4):��LstB7z��8Lܧ��w�4jL#������n3:��]f�'�p�5kғ�J�\gf=2]�`J�~�bv�&9��;F�w!)\�K|��@��	���czN���s	��z�z�E�J�oR��Lǫ��*��Q{�#.�=V��jz��5����$V�S�h�^咔֟��7I=�h�b~���n�}�Z���Ƕ5��enjӣ0k�0֩��s��Hý�fa>W9u#A¤�{�
C\����3ޢ�~��E=���@�E�F�!�N�bK�8����7�3��;�!"�qe&�wm�B�!D}�n�|���6���x#�2u)vI�A�W�l�{�8�6bY�l�"j����L-���o��4�[�S&/��!ugc��x[$^�������nQ��6��h�V�?�{U)%N�k��+i�=X���G��x
*bUG�::������o?&�@�������A��^�L���N�L�׾�~�E	�P���@��1Zc����_��f?��դ�n�>-+�\��,�1��q���[j�x��C���ry��"��g[僝��j�!YG)������}�7u��~�������z�	&i\�I�[��598��M��w�\����g�J�+�{�ً�=[�7�o݊��T�_�l*sE�t!���$���^=-
?.�n{�@��;^m9:�ޫ��m�.5`4B:3�o�k�J`�2��Z<�@m]tm�\�ی�^�z;=��d�}�rsgǳM�/wv$����V�^�`g.앓`�e��H_f��Ey������&Ԟm:yA�}�v9��V�����^n�Gn;��Zu�&7H�6ƻ�~{�����k�
      �   B  x����nS1��'Oq�(��|�!�*���*�@E"��3��_���-���aAZ�~?�<>�x\�<����痿���������+��1		�|w$�,Md��g����t<-�����GHnE�D�e64!�K�2RCBEI�9�4�>%��J��
�*%�(4�~A��, `ߢ�1�$	&�6�z�o�L�Ζ�Uʇ�_>z�\�@61� C<=�^4UCh�}&�m�V9B;'�9!��6A#2��'�8^�L@�M�<\�ͫ6����p%�$�6�EƧ�b��\��0�RU�}�����Q�y
�� �����I� �i�]eJ��n3Pm�x�3�~��w��Ѕ�v{�>x\��C.���H�zn�����t��&r���Q�ԐkG��Μ�ʶ3�p`<O�1�7HqN�.<����N�Y�4����u���W�>�<�����4�_I�_�k����?�=��)�~��#u?[����y��� ��[.ϲ��<M�[��+@��������Wȶ�y���=mdi�Z0���b,F���U�6,J�c��7����(M��      �   D	  x��WMs7=˿勒*�ER�,�R�כ��Ny�M��8r`a�1>H���{�ᐖ�݃T3�������ru}��'Ӕh�Ao�ůQ����b�X-.����+��/�����fu�byu}��nu������C4�z7��+�T����-}P�|�*lT������ҾU�0�d��[ߖ��a��Mu:��1^��\�~�~����D�#��7�E��}��ګ�|��� ��V[�9�wpF�J�X;�*��L����4��������z���T��������1></�%+�RϜ���i�L�c�9�b� ������`���Bh:������8xCq:�Dg+H���ER{�;y�8B'� ߛ�U��I5���s�����i����0x f[�r�P�Φ��S���Jg��+�<��0��Exָ�r2�l�I�9�9�?{���g��U�Ϳ�G�
Fi������7�A�:h�nq��:¨ւ(��U���n��H؈�.h�5�"	^�4���!�<W�&g���Kzl%���B�rH�{��3@�4�f ��0fd��/ߌ�u&���-�.g�K+�Sdo������O�i��S+�ݛuE�C��{��<>��������e��'�V��U2:6�ڄ�.�l��zYs��eO�xd�ٰ~��R֒!���_ s y&�t�dv�����y���/��d�cb�u��P���������/Fѕ>�X����yb`e!�a @7��61�BFf'�x`���ߜ5��cbPF�8,��$1���Ff4�gp潆�7ECD��ōz����j�XTHTp�?,t���y�(3�r5Zb؀�HX���@v���z��� -�Rg�_6n!z&<he ���
a�zV�Cl��5f�<�>�ԥ�gF�b(�*W��c<�&��	�3V�P��4 \�Y
!!�����0��zD�\��r1�^�/���g?o��'�_�����!����s�E������_Ch��۝u?��olcb@�A�D�2
��`���#��]�!J?2��E���j-��@f��k0=#�Gt��4��>S�ߟ
�F�C������spt� �G��(M%³���th��Σ���;1Í�kKCU6rC���S�2ĝ����ʏ8��24e@�)I�=;{��$D��]�XAGB?hok�E��H�@���ȟ��i
�C�Ad;}�Ө&F�wj���q�s�q�A�t>v�c~��i�H�:SH1�/�#Z��T6)
��V��)*&��GZ8�F�(!���[���m0`���ێ���ގ�@�6
�Rbk:H+��8~`$�{Sߚ^G�
����H��e������ζm�&	o�j��+��~���x���6V�;2�#�K9�@B��?�:��y3��Its'=�Xn9s:��"� ���Za���}���ٯ��42��Mq�P/�Aú�DQ
!v!�у�c�	d�Xz:�p�����q�A6A�f����ʖA̞d�����sfҌ��2��f*�y��m��T�ea}\��#*/�������r).��m~�o��\_-WW��������4o7���:���l��]ެp��V�7`ѓ�)�>�-W0���ռ+-����������������|�ǻ�S��?�n�&'U�·�xc<6�$�� �mm[0%B L�-�)[��L���z�@)N5%&�'҄�`?f��DV��W�.&��|q��F��&+\ĊjzÖd��D��%�bPs��}���V�+c�����)L���@'lr��7s��p��/�	[8����Z,/5=�	��7�*wn��ߖ�\�����i&��jx�lp-n(��?R���ZPDAt^���á�-���&�H��@J�Q��8ڰ�!"�|���SRu	�w#�����2�6��OȘ�+��1sLP8dOk� ��2�Ng�9��"�� `v6ka�3S~���SAFZ8ewm���9���?�X��	F ���y�PFq���ٿ@.p�O>�gwQY*��'INf��`���$>��a�7����#���fpw��K�c�^֞��@ͩ� l;�V�GP�d���O�V�
�)�ҵ�&z�ɀ� �<�g	8�-eƵG����^KV/��e�!y��&��W�F.e`�8�0ĦP� q^��Z� ����Y�V$�7��0jB�0+ю�n`s�^,tS��"K��+�FTkyE�t��P)@Hz`�M'*n��=��\���G�`�2K�J��0�R�@���\ُ쓢���ju;5�����8���^<�T��Ϟ=�/�r      �   v   x�E�A
B1е=�@D���Li��O��E����p���r;�R�WV:2�M$-�a3Wڦ�W�aI|��&��^�>f���U��R$jVDvnx��i�դ&����}��8�>�3'      �   /   x���M��4��4360525�0�*�L������q��qqq �/	      �   �   x�}���0Eq�Ec��ԩ]8���������zU����=�ؑ���e4ǲ�u�?rȀ�g����� K;�h�7�T4��|��mM�94�X��Q�L���C����l.i�K�{�K% Q`�a���S����o�6n      �     x����n�0���S�^h03.�@{R4E��r���bF��j��ԉA�緾����"ڎ��^��������1��v��c���I�_���������� ��(�kb)���=D�i�^��F�pw�����r�uR����j��� �q5:�8��ɀ�P�3i�s�]��~jti�)���I�ܰdQ7 �c	/�.��u��L���������
i�;��y?^f�T=XH3�Qk����r��hE;�<�²�i����}��Hc$������a��pZ���?��x���XY�T��,Q���N�mm.��A��N��4����t�tK�.��ы\�kg�X÷pZ�\)����|��H��o�ν�݂)��@���ɀ�k�mᓅ�7! 7����gN�����aB#�,Ί�Y��d1^��4c����U�[���2>gᔤu���$BU�'���apō1Kz�P������|bt��[M:",��v�
�>������F     