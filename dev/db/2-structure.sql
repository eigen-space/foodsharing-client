create extension if not exists "uuid-ossp";

create table public."distributionRequest"(
    id uuid DEFAULT uuid_generate_v4(),
    description text not null,
    status text not null,
    "distributionTimeFrom" timestamp,
    "distributionTimeTo" timestamp,
    "deliveryTimeFrom" timestamp,
    "deliveryTimeTo" timestamp,
    PRIMARY KEY (id)
);

create table public.role(
    id uuid DEFAULT uuid_generate_v4(),
    name text not null,
    PRIMARY KEY (id)
);

create table public.account(
    id uuid DEFAULT uuid_generate_v4(),
    name text not null,
    "roleId" uuid not null,
    PRIMARY KEY (id),
    FOREIGN KEY ("roleId") references public.role(id)
);

create table public.outpost(
    id uuid DEFAULT uuid_generate_v4(),
    name text not null,
    lat text,
    lon text,
    PRIMARY KEY (id)
);

create table public.category(
    id uuid DEFAULT uuid_generate_v4(),
    name text not null,
    PRIMARY KEY (id)
);

create table public.slot(
    id uuid DEFAULT uuid_generate_v4(),
    "distributionRequestId" uuid not null,
    "accountId" uuid,
    status text not null,
    PRIMARY KEY (id),
    FOREIGN KEY ("distributionRequestId") references public."distributionRequest"(id),
    FOREIGN KEY ("accountId") references public.account(id)
);

create table public."categoryToAccount"(
    id uuid DEFAULT uuid_generate_v4(),
    "categoryId" uuid not null,
    "accountId" uuid not null,
    PRIMARY KEY (id)
);