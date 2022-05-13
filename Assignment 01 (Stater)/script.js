'use strict';


var pet = JSON.parse(localStorage.getItem('pet')) || [];

pet.map((item, index) => {
    $("#tbody").append(
        `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.type}</td>
            <td>${item.weight}</td>
            <td>2</td>
            <td>${item.breed}</td>
            <td>
                <i id=${item.id} class="bi bi-square-fill" style="color: red"></i>
            </td>
            <td id="vaccinated-${item.id}"><i class="bi bi-check-circle-fill"></i></td>
            <td id="dewormed-${item.id}"><i class="bi bi-check-circle-fill"></i></td>
            <td id="sterilized-${item.id}"><i class="bi bi-check-circle-fill"></i></td>
            <td>01/03/2022</td>
            <td>
            <button id=${item.id} type="button" class="btn btn-success btn-edit">Edit</button>
            <button id=${item.id} type="button" class="btn btn-danger btn-delete">Delete</button>
            </td>
        </tr>`
    );
    console.log(pet)

    if (item.vaccinated) {
        $(`#vaccinated-${item.id}`).html('<i class="bi bi-check-circle-fill"></i>')
    } else {
        $(`#vaccinated-${item.id}`).html('<i class="fas fa-times-circle"></i>')
    }

    if (item.dewormed) {
        $(`#dewormed-${item.id}`).html('<i class="bi bi-check-circle-fill"></i>')
    } else {
        $(`#dewormed-${item.id}`).html('<i class="fas fa-times-circle"></i>')
    }

    if (item.sterilized) {
        $(`#sterilized-${item.id}`).html('<i class="bi bi-check-circle-fill"></i>')
    } else {
        $(`#sterilized-${item.id}`).html('<i class="fas fa-times-circle"></i>')
    }

    $(`#${item.id}`).css("color", item.color);
});

const FORM_CREATE = "create";
const FORM_UPDATE = "update";
var form = FORM_CREATE;

var petId = $("#input-id");
var nameId = $("#input-name");
var ageId = $("#input-age");
var typeId = $("#input-type");
var weightId = $("#input-weight");
var lengthId = $("#input-length");
var colorId = $("#input-color-1");
var breedId = $("#input-breed");
var vaccinatedId = $("#input-vaccinated");
var dewormedId = $("#input-dewormed");
var sterilizedId = $("#input-sterilized");



$("#mytable").on("click", ".btn-delete", function () {
    console.log("Clg", this.id);
    console.log(pet)


    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

            pet.map((item, index) => {
                console.log(item.id, index)
                if (item.id === this.id) {
                    pet.splice(index, 1);
                }
            })
            localStorage.setItem('pet', JSON.stringify(pet));

            $(this).closest("tr").remove();
        }
    })
});

$("#mytable").on("click", ".btn-edit", function () {
    let petId = this.id;
    console.log(petId)
    form = FORM_UPDATE;
    for (const item of pet) {
        if (petId === item.id) {
            $("#input-id").val(item.id);
            nameId.val(item.name);
            ageId.val(item.age);
            typeId.val(item.type);
            weightId.val(item.weight);
            lengthId.val(item.length);
            colorId.val(item.color);
            breedId.val(item.breed);
            vaccinatedId.prop("checked", item.vaccinated);
            dewormedId.prop("checked", item.dewormed);
            sterilizedId.prop("checked", item.sterilized);
        }
    }
});


$("#submit-btn").click(function () {
    const petNew = {
        id: petId.val(),
        name: nameId.val(),
        age: ageId.val(),
        type: typeId.val(),
        weight: weightId.val(),
        length: lengthId.val(),
        color: colorId.val(),
        breed: breedId.val(),
        vaccinated: vaccinatedId.is(":checked"),
        dewormed: dewormedId.is(":checked"),
        sterilized: sterilizedId.is(":checked"),
    }

    if (form === "create") {
        let validate = true;
        pet.map((item) => {
            if (item.id ? item.id == petId.val() : false) {
                Swal.fire({
                    icon: 'error',
                    html: `<p style="color: red">ID already exist !</p>`,
                    showConfirmButton: false,
                    timer: 1500
                })
                validate = false;
            }

        })
        console.log(validate);

        if (validate) {
            $("#tbody").append(
                `<tr>
                <th scope="row">${petId.val()}</th>
                <td>${nameId.val()}</td>
                <td>${ageId.val()}</td>
                <td>${typeId.val()}</td>
                <td>${weightId.val()} kg</td>
                <td>${lengthId.val()} cm</td>
                <td>${breedId.val()}</td>
                <td>
                    <i class="bi bi-square-fill" style="color: ${colorId.val()}"></i>
                </td>
                <td id="vaccinated-${petId.val()}"><i class="bi bi-check-circle-fill"></i></td>
                <td id="dewormed-${petId.val()}"><i class="bi bi-check-circle-fill"></i></td>
                <td id="sterilized-${petId.val()}"><i class="bi bi-check-circle-fill"></i></td>
                <td>01/03/2022</td>
                <td>
                <button id=${petId.val()} type="button" class="btn btn-success btn-edit">Edit</button>
                <button id=${petId.val()} type="button" class="btn btn-danger btn-delete">Delete</button>
                </td>
            </tr>`
            );

            if (vaccinatedId.is(":checked")) {
                $(`#vaccinated-${petId.val()}`).html('<i class="bi bi-check-circle-fill"></i>')
            } else {
                $(`#vaccinated-${petId.val()}`).html('<i class="fas fa-times-circle"></i>')
            }

            if (dewormedId.is(":checked")) {
                $(`#dewormed-${petId.val()}`).html('<i class="bi bi-check-circle-fill"></i>')
            } else {
                $(`#dewormed-${petId.val()}`).html('<i class="fas fa-times-circle"></i>')
            }

            if (sterilizedId.is(":checked")) {
                $(`#sterilized-${petId.val()}`).html('<i class="bi bi-check-circle-fill"></i>')
            } else {
                $(`#sterilized-${petId.val()}`).html('<i class="fas fa-times-circle"></i>')
            }

            pet.push(petNew);
            console.log(petNew);
            localStorage.setItem('pet', JSON.stringify(pet));

            Swal.fire({
                icon: 'success',
                html: `<p style="color: red">Add complete !</p>`,
                showConfirmButton: false,
                timer: 1500
            })

            petId.val("");
            nameId.val("");
            ageId.val("");
            typeId.val("");
            weightId.val("");
            lengthId.val("");
            colorId.val("");
            breedId.val("");
            vaccinatedId.prop("checked", false);
            dewormedId.prop("checked", false);
            sterilizedId.prop("checked", false);


        }
    } else if (form === "update") {
            pet.map((item, index) => {
            if (item.id === petNew.id) {
                return pet.splice(index, 1, petNew);
            }
        })
        console.log(petNew)
        console.log(pet)
        $("#tbody").empty();
        pet.map((item, index) => {
            
            $("#tbody").append(
                `<tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.type}</td>
                    <td>${item.weight}</td>
                    <td>2</td>
                    <td>${item.breed}</td>
                    <td>
                        <i id=${item.id} class="bi bi-square-fill" style="color: red"></i>
                    </td>
                    <td id="vaccinated-${item.id}"><i class="bi bi-check-circle-fill"></i></td>
                    <td id="dewormed-${item.id}"><i class="bi bi-check-circle-fill"></i></td>
                    <td id="sterilized-${item.id}"><i class="bi bi-check-circle-fill"></i></td>
                    <td>01/03/2022</td>
                    <td>
                    <button id=${item.id} type="button" class="btn btn-success btn-edit">Edit</button>
                    <button id=${item.id} type="button" class="btn btn-danger btn-delete">Delete</button>
                    </td>
                </tr>`
            );
            
        
            if (item.vaccinated) {
                $(`#vaccinated-${item.id}`).html('<i class="bi bi-check-circle-fill"></i>')
            } else {
                $(`#vaccinated-${item.id}`).html('<i class="fas fa-times-circle"></i>')
            }
        
            if (item.dewormed) {
                $(`#dewormed-${item.id}`).html('<i class="bi bi-check-circle-fill"></i>')
            } else {
                $(`#dewormed-${item.id}`).html('<i class="fas fa-times-circle"></i>')
            }
        
            if (item.sterilized) {
                $(`#sterilized-${item.id}`).html('<i class="bi bi-check-circle-fill"></i>')
            } else {
                $(`#sterilized-${item.id}`).html('<i class="fas fa-times-circle"></i>')
            }
        
            $(`#${item.id}`).css("color", item.color);
        });

        localStorage.setItem('pet', JSON.stringify(pet));

        form = FORM_CREATE;
    }




});

$("#healthy-btn").click(function () {
    const petFilter = pet.filter(item => item.vaccinated && item.dewormed && item.sterilized)
    $("#tbody").empty();
    petFilter.map((item, index) => {
        $("#tbody").append(
            `<tr>
                <th scope="row">${item.id}</th>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.type}</td>
                <td>${item.weight}</td>
                <td>2</td>
                <td>${item.breed}</td>
                <td>
                    <i id=${item.id} class="bi bi-square-fill" style="color: red"></i>
                </td>
                <td id="vaccinated-${item.id}"><i class="bi bi-check-circle-fill"></i></td>
                <td id="dewormed-${item.id}"><i class="bi bi-check-circle-fill"></i></td>
                <td id="sterilized-${item.id}"><i class="bi bi-check-circle-fill"></i></td>
                <td>01/03/2022</td>
                <td><button id=${item.id} type="button" class="btn btn-danger btn-delete">Delete</button>
                </td>
            </tr>`
        );
        console.log(petFilter);

        if (item.vaccinated) {
            $(`#vaccinated-${item.id}`).html('<i class="bi bi-check-circle-fill"></i>')
        } else {
            $(`#vaccinated-${item.id}`).html('<i class="fas fa-times-circle"></i>')
        }

        if (item.dewormed) {
            $(`#dewormed-${item.id}`).html('<i class="bi bi-check-circle-fill"></i>')
        } else {
            $(`#dewormed-${item.id}`).html('<i class="fas fa-times-circle"></i>')
        }

        if (item.sterilized) {
            $(`#sterilized-${item.id}`).html('<i class="bi bi-check-circle-fill"></i>')
        } else {
            $(`#sterilized-${item.id}`).html('<i class="fas fa-times-circle"></i>')
        }

        $(`#${item.id}`).css("color", item.color);
    });
})