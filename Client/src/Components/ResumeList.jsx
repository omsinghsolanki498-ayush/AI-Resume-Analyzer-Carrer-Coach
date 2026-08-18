// import { useState } from "react";

// import ResumeCard from "./ResumeCard";

// function ResumeList({
//     resumes,
//     onDelete,
// }) {

//     const [deleting, setDeleting] =
//         useState("");

//     const handleDelete = async (id) => {

//         const confirmDelete =
//             window.confirm(
//                 "Are you sure you want to delete this resume?"
//             );

//         if (!confirmDelete) return;

//         setDeleting(id);

//         await onDelete(id);

//         setDeleting("");

//     };

//     return (

//         <div className="space-y-3">

//             {resumes.map((resume) => (

//                 <ResumeCard
//                     key={resume._id}
//                     resume={resume}
//                     onDelete={handleDelete}
//                     deleting={deleting}
//                 />

//             ))}

//         </div>
//     );
// }

// export default ResumeList;
import { useState } from "react";

import ResumeCard from "./ResumeCard";


function ResumeList({
    resumes = [],
    onDelete,
}) {

    const [deleting, setDeleting] =
        useState("");


    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this resume?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            setDeleting(id);


            const success =
                await onDelete(id);


            if (!success) {

                console.log(
                    "Resume deletion failed"
                );

            }

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

        } finally {

            setDeleting("");

        }
    };


    return (

        <div className="space-y-3">

            {resumes.map((resume) => (

                <ResumeCard
                    key={resume._id}
                    resume={resume}
                    onDelete={handleDelete}
                    deleting={deleting}
                />

            ))}

        </div>

    );
}


export default ResumeList;