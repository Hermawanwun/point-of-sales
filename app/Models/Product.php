<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $casts = [
        'id' => 'integer',
        'category_id' => 'integer',
        'buy_price' => 'integer',
        'sell_price' => 'integer',
        'stock' => 'integer',
    ];

    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'image',
        'barcode',
        'sku',
        'title',
        'description',
        'buy_price',
        'sell_price',
        'category_id',
        'stock',
    ];

    /**
     * category
     *
     * @return void
     */
    public function category()
    {
        return $this->belongsTo(Category::class)->withTrashed();
    }

    /**
     * transaction details
     *
     * @return void
     */
    public function transactionDetails()
    {
        return $this->hasMany(TransactionDetail::class);
    }

    /**
     * carts
     *
     * @return void
     */
    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    /**
     * image
     *
     * @return Attribute
     */
    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset('/storage/products/' . $value),
        );
    }
}
