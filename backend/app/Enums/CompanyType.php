<?php

namespace App\Enums;


enum CompanyType: string {
    case Manufacturer = 'manufacturer';
    case Supplier = 'supplier';
    case Customer = 'customer';
}
