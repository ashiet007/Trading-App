<?php

namespace App\Imports;

use App\Models\Kyc;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $user = User::create([
                'name'  => $row['first_name'] . ' ' . $row['middle_name'] . ' ' . $row['last_name'],
                'email' => $row['email'],
                'password' => Hash::make('12345678'),
            ]);

            Kyc::create([
                'user_id' => $user->id,
                'first_name' => $row['first_name'],
                'middle_name' => $row['middle_name'],
                'last_name' => $row['last_name'],
                'birth_date' => $row['birth_date'],
                'address' => $row['address_line'],
                'country_name' => $row['country_name'],
                'state' => $row['state'],
                'city' => $row['city'],
                'zip_code' => $row['zip_code']
            ]);
        }
    }
}
