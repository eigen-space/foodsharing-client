-- role
insert into public.role values ('b74f1c1e-2d46-419d-b98b-be65ca0be94e', 'rescuer');
insert into public.role values ('1630a1a0-a85e-4e72-bdb7-fc7500349fe7', 'volunteer');
insert into public.role values ('d265a6d6-e410-4ed3-aeaa-c65250eb30dd', 'supplier');

-- account
insert into public.account values (112534257, 'Булочная Ф. Вольчека №93', 'd265a6d6-e410-4ed3-aeaa-c65250eb30dd');

-- category
insert into public.category values ('ba5d6cda-5583-4540-a66d-8dbf75a4f78b', 'vegetables');

-- category to account
insert into public."categoryToAccount" ("accountId", "categoryId") values ('fe989574-6ce8-4da0-8ae3-b07dea64d699', 'ba5d6cda-5583-4540-a66d-8dbf75a4f78b');

-- outpost
insert into public.outpost (name, lat, lon) values ('Европейский просп., д.8, Санкт-Петербург, Ленинградская обл., 188691', '59.9020188', '30.5128527');
